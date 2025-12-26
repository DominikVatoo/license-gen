const fs = require('fs');
const path = require('path');
const licenses = require('./templates/licenses');

class LicenseChecker {
  checkCompatibility(projectLicense, dependencyLicenses) {
    if (!licenses[projectLicense]) {
      return {
        valid: false,
        error: `Unknown project license: ${projectLicense}`
      };
    }

    const compatible = licenses[projectLicense].compatible || [];
    const incompatible = [];
    const warnings = [];
    const unknown = [];

    dependencyLicenses.forEach(depLicense => {
      if (!depLicense || depLicense === 'UNKNOWN' || depLicense === 'UNLICENSED') {
        unknown.push(depLicense);
        return;
      }

      const normalizedLicense = this.normalizeLicense(depLicense);
      
      if (!normalizedLicense) {
        unknown.push(depLicense);
        return;
      }

      if (!compatible.includes(normalizedLicense)) {
        if (licenses[projectLicense].copyleft && licenses[normalizedLicense]?.permissive) {
          warnings.push({
            license: depLicense,
            reason: 'Permissive license in copyleft project - usually OK but review carefully'
          });
        } else {
          incompatible.push({
            license: depLicense,
            reason: 'Not compatible with project license'
          });
        }
      }
    });

    return {
      valid: incompatible.length === 0,
      compatible: compatible,
      incompatible,
      warnings,
      unknown
    };
  }

  checkProject(projectPath = './') {
    const packageJsonPath = path.join(projectPath, 'package.json');
    
    if (!fs.existsSync(packageJsonPath)) {
      return {
        error: 'package.json not found',
        valid: false
      };
    }

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const projectLicense = packageJson.license;

    if (!projectLicense) {
      return {
        error: 'No license specified in package.json',
        valid: false
      };
    }

    const nodeModulesPath = path.join(projectPath, 'node_modules');
    
    if (!fs.existsSync(nodeModulesPath)) {
      return {
        error: 'node_modules not found. Run npm install first.',
        valid: false
      };
    }

    const dependencies = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies
    };

    const depLicenses = [];
    const detailedDeps = [];

    Object.keys(dependencies).forEach(dep => {
      const depPackageJsonPath = path.join(nodeModulesPath, dep, 'package.json');
      
      if (fs.existsSync(depPackageJsonPath)) {
        try {
          const depPackageJson = JSON.parse(fs.readFileSync(depPackageJsonPath, 'utf8'));
          const license = depPackageJson.license || 'UNKNOWN';
          depLicenses.push(license);
          detailedDeps.push({
            name: dep,
            license: license,
            version: depPackageJson.version
          });
        } catch (e) {
          depLicenses.push('UNKNOWN');
          detailedDeps.push({
            name: dep,
            license: 'UNKNOWN',
            error: 'Could not read package.json'
          });
        }
      }
    });

    const compatibility = this.checkCompatibility(projectLicense, depLicenses);

    return {
      projectLicense,
      dependencies: detailedDeps,
      ...compatibility
    };
  }

  normalizeLicense(license) {
    if (!license) return null;
    
    const normalized = license.toUpperCase().trim();
    
    const mapping = {
      'MIT': 'MIT',
      'APACHE-2.0': 'Apache-2.0',
      'APACHE 2.0': 'Apache-2.0',
      'GPL-3.0': 'GPL-3.0',
      'GPL-2.0': 'GPL-2.0',
      'BSD-3-CLAUSE': 'BSD-3-Clause',
      'BSD-2-CLAUSE': 'BSD-2-Clause',
      'ISC': 'ISC',
      'AGPL-3.0': 'AGPL-3.0',
      'UNLICENSE': 'Unlicense',
      'LGPL-3.0': 'LGPL-3.0',
      'MPL-2.0': 'MPL-2.0'
    };

    return mapping[normalized] || null;
  }

  getLicenseStats(projectPath = './') {
    const result = this.checkProject(projectPath);
    
    if (result.error) {
      return result;
    }

    const stats = {};
    
    result.dependencies.forEach(dep => {
      const license = dep.license || 'UNKNOWN';
      stats[license] = (stats[license] || 0) + 1;
    });

    return {
      projectLicense: result.projectLicense,
      totalDependencies: result.dependencies.length,
      licenseDistribution: stats,
      uniqueLicenses: Object.keys(stats).length
    };
  }
}

module.exports = new LicenseChecker();
