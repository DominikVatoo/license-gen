const fs = require('fs');
const path = require('path');
const licenses = require('./templates/licenses');

class LicenseGenerator {
  generate(licenseType, author, year, outputPath = './LICENSE') {
    if (!licenses[licenseType]) {
      throw new Error(`License type "${licenseType}" not found. Available: ${Object.keys(licenses).join(', ')}`);
    }

    const license = licenses[licenseType];
    let content = license.template;

    content = content.replace(/\[year\]/g, year || new Date().getFullYear());
    content = content.replace(/\[fullname\]/g, author || 'Your Name');

    const fullPath = path.resolve(outputPath);
    fs.writeFileSync(fullPath, content, 'utf8');

    return {
      success: true,
      path: fullPath,
      license: license.name
    };
  }

  list() {
    return Object.entries(licenses).map(([key, value]) => ({
      key,
      name: value.name,
      permissive: value.permissive || false,
      copyleft: value.copyleft || false,
      publicDomain: value.publicDomain || false
    }));
  }

  getInfo(licenseType) {
    if (!licenses[licenseType]) {
      return null;
    }

    const license = licenses[licenseType];
    return {
      name: license.name,
      permissive: license.permissive || false,
      copyleft: license.copyleft || false,
      publicDomain: license.publicDomain || false,
      compatible: license.compatible || []
    };
  }
}

module.exports = new LicenseGenerator();
