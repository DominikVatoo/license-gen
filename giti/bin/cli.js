#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
const inquirer = require('inquirer');
const ora = require('ora');
const generator = require('../src/generator');
const checker = require('../src/checker');

const program = new Command();

program
  .name('license-gen')
  .description('CLI tool to generate licenses and check dependency license compatibility')
  .version('1.0.0');

program
  .command('generate')
  .alias('gen')
  .description('Generate a license file')
  .option('-t, --type <type>', 'License type (MIT, Apache-2.0, GPL-3.0, etc.)')
  .option('-a, --author <author>', 'Author name')
  .option('-y, --year <year>', 'Copyright year')
  .option('-o, --output <path>', 'Output path', './LICENSE')
  .action(async (options) => {
    try {
      let licenseType = options.type;
      let author = options.author;
      let year = options.year;

      if (!licenseType) {
        const licenses = generator.list();
        const { selectedLicense } = await inquirer.prompt([
          {
            type: 'list',
            name: 'selectedLicense',
            message: 'Select a license:',
            choices: licenses.map(l => ({
              name: `${l.key} - ${l.name}${l.permissive ? ' (Permissive)' : ''}${l.copyleft ? ' (Copyleft)' : ''}`,
              value: l.key
            }))
          }
        ]);
        licenseType = selectedLicense;
      }

      if (!author) {
        const { inputAuthor } = await inquirer.prompt([
          {
            type: 'input',
            name: 'inputAuthor',
            message: 'Author name:',
            default: 'Your Name'
          }
        ]);
        author = inputAuthor;
      }

      if (!year) {
        year = new Date().getFullYear().toString();
      }

      const spinner = ora('Generating license...').start();

      const result = generator.generate(licenseType, author, year, options.output);

      spinner.succeed(chalk.green(`License generated successfully!`));
      console.log(chalk.cyan(`License: ${result.license}`));
      console.log(chalk.cyan(`Path: ${result.path}`));
    } catch (error) {
      console.error(chalk.red(`Error: ${error.message}`));
      process.exit(1);
    }
  });

program
  .command('list')
  .description('List all available licenses')
  .action(() => {
    const licenses = generator.list();
    
    console.log(chalk.bold('\nAvailable Licenses:\n'));
    
    licenses.forEach(license => {
      let type = '';
      if (license.publicDomain) type = chalk.blue('[Public Domain]');
      else if (license.permissive) type = chalk.green('[Permissive]');
      else if (license.copyleft) type = chalk.yellow('[Copyleft]');
      
      console.log(`${chalk.bold(license.key.padEnd(15))} ${type.padEnd(20)} ${license.name}`);
    });
    
    console.log('');
  });

program
  .command('info <license>')
  .description('Get information about a specific license')
  .action((license) => {
    const info = generator.getInfo(license);
    
    if (!info) {
      console.error(chalk.red(`License "${license}" not found.`));
      process.exit(1);
    }

    console.log(chalk.bold(`\n${info.name}\n`));
    console.log(`Type: ${info.permissive ? chalk.green('Permissive') : info.copyleft ? chalk.yellow('Copyleft') : chalk.blue('Other')}`);
    console.log(`\nCompatible with:`);
    info.compatible.forEach(compat => {
      console.log(`  ${chalk.cyan('•')} ${compat}`);
    });
    console.log('');
  });

program
  .command('check')
  .description('Check license compatibility of project dependencies')
  .option('-p, --path <path>', 'Project path', './')
  .action((options) => {
    const spinner = ora('Checking dependencies...').start();

    try {
      const result = checker.checkProject(options.path);

      if (result.error) {
        spinner.fail(chalk.red(result.error));
        process.exit(1);
      }

      spinner.succeed('Check complete!');

      console.log(chalk.bold(`\nProject License: ${chalk.cyan(result.projectLicense)}`));
      console.log(chalk.bold(`Total Dependencies: ${result.dependencies.length}\n`));

      if (result.incompatible.length > 0) {
        console.log(chalk.red.bold(`❌ Incompatible Licenses Found (${result.incompatible.length}):\n`));
        result.incompatible.forEach(inc => {
          console.log(chalk.red(`  • ${inc.license} - ${inc.reason}`));
        });
        console.log('');
      }

      if (result.warnings.length > 0) {
        console.log(chalk.yellow.bold(`⚠️  Warnings (${result.warnings.length}):\n`));
        result.warnings.forEach(warn => {
          console.log(chalk.yellow(`  • ${warn.license} - ${warn.reason}`));
        });
        console.log('');
      }

      if (result.unknown.length > 0) {
        console.log(chalk.gray.bold(`❓ Unknown Licenses (${result.unknown.length}):\n`));
        result.unknown.forEach(unk => {
          console.log(chalk.gray(`  • ${unk}`));
        });
        console.log('');
      }

      if (result.valid && result.warnings.length === 0 && result.unknown.length === 0) {
        console.log(chalk.green.bold('✅ All dependencies are compatible!\n'));
      } else if (result.valid) {
        console.log(chalk.green.bold('✅ No incompatible licenses found, but review warnings.\n'));
      } else {
        console.log(chalk.red.bold('❌ Incompatible licenses detected!\n'));
        process.exit(1);
      }

    } catch (error) {
      spinner.fail(chalk.red(`Error: ${error.message}`));
      process.exit(1);
    }
  });

program
  .command('stats')
  .description('Show license statistics for project dependencies')
  .option('-p, --path <path>', 'Project path', './')
  .action((options) => {
    const spinner = ora('Analyzing dependencies...').start();

    try {
      const result = checker.getLicenseStats(options.path);

      if (result.error) {
        spinner.fail(chalk.red(result.error));
        process.exit(1);
      }

      spinner.succeed('Analysis complete!');

      console.log(chalk.bold(`\nProject License: ${chalk.cyan(result.projectLicense)}`));
      console.log(chalk.bold(`Total Dependencies: ${result.totalDependencies}`));
      console.log(chalk.bold(`Unique Licenses: ${result.uniqueLicenses}\n`));

      console.log(chalk.bold('License Distribution:\n'));

      const sorted = Object.entries(result.licenseDistribution)
        .sort((a, b) => b[1] - a[1]);

      sorted.forEach(([license, count]) => {
        const percentage = ((count / result.totalDependencies) * 100).toFixed(1);
        const bar = '█'.repeat(Math.ceil(count / result.totalDependencies * 30));
        console.log(`${license.padEnd(20)} ${bar} ${count} (${percentage}%)`);
      });

      console.log('');

    } catch (error) {
      spinner.fail(chalk.red(`Error: ${error.message}`));
      process.exit(1);
    }
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
