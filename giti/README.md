# License Generator & Checker

A powerful CLI tool to generate open-source licenses and check dependency license compatibility for your projects.

## Features

- **Generate Licenses**: Create license files with automatic year and author insertion
- **Interactive Mode**: Select licenses through an interactive CLI interface
- **Compatibility Checker**: Verify if your dependencies' licenses are compatible with your project license
- **License Statistics**: Analyze license distribution across your dependencies
- **10+ Popular Licenses**: MIT, Apache-2.0, GPL-3.0, BSD, ISC, and more

## Installation

```bash
npm install -g license-gen
```

Or use locally in your project:

```bash
npm install license-gen
```

## Usage

### Generate a License

Interactive mode:
```bash
license-gen generate
```

With options:
```bash
license-gen generate --type MIT --author "Your Name" --year 2024
```

Short form:
```bash
license-gen gen -t Apache-2.0 -a "Your Name" -o ./LICENSE
```

### List Available Licenses

```bash
license-gen list
```

Output:
```
Available Licenses:

MIT             [Permissive]         MIT License
Apache-2.0      [Permissive]         Apache License 2.0
GPL-3.0         [Copyleft]           GNU General Public License v3.0
BSD-3-Clause    [Permissive]         BSD 3-Clause License
ISC             [Permissive]         ISC License
...
```

### Get License Information

```bash
license-gen info MIT
```

Output:
```
MIT License

Type: Permissive

Compatible with:
  • MIT
  • Apache-2.0
  • BSD-3-Clause
  • BSD-2-Clause
  • ISC
  • Unlicense
```

### Check Dependency Compatibility

Check if your project's dependencies have compatible licenses:

```bash
license-gen check
```

Or specify a path:
```bash
license-gen check --path ./my-project
```

Output:
```
✔ Check complete!

Project License: MIT
Total Dependencies: 42

✅ All dependencies are compatible!
```

If incompatibilities are found:
```
❌ Incompatible Licenses Found (2):

  • GPL-3.0 - Not compatible with project license
  • AGPL-3.0 - Not compatible with project license

⚠️  Warnings (1):

  • Unknown - License not specified

❌ Incompatible licenses detected!
```

### License Statistics

View license distribution in your project:

```bash
license-gen stats
```

Output:
```
Project License: MIT
Total Dependencies: 42
Unique Licenses: 8

License Distribution:

MIT                  ████████████████████ 25 (59.5%)
ISC                  ████████ 10 (23.8%)
Apache-2.0           ███ 4 (9.5%)
BSD-3-Clause         ██ 2 (4.8%)
Unlicense            █ 1 (2.4%)
```

## Supported Licenses

| License | Type | Key |
|---------|------|-----|
| MIT License | Permissive | `MIT` |
| Apache License 2.0 | Permissive | `Apache-2.0` |
| GNU GPL v3.0 | Copyleft | `GPL-3.0` |
| GNU GPL v2.0 | Copyleft | `GPL-2.0` |
| BSD 3-Clause | Permissive | `BSD-3-Clause` |
| BSD 2-Clause | Permissive | `BSD-2-Clause` |
| ISC License | Permissive | `ISC` |
| GNU AGPL v3.0 | Copyleft | `AGPL-3.0` |
| GNU LGPL v3.0 | Copyleft | `LGPL-3.0` |
| Mozilla Public License 2.0 | Copyleft | `MPL-2.0` |
| The Unlicense | Public Domain | `Unlicense` |

## License Compatibility

### Permissive Licenses
Permissive licenses (MIT, Apache-2.0, BSD, ISC) allow you to:
- Use the code commercially
- Modify the code
- Distribute the code
- Sublicense the code

They are generally compatible with most other licenses.

### Copyleft Licenses
Copyleft licenses (GPL, AGPL, LGPL) require:
- Derivative works to use the same license
- Source code to be made available
- Changes to be documented

They have stricter compatibility requirements.

### Compatibility Matrix

| Your License | Compatible With |
|--------------|-----------------|
| MIT | MIT, Apache-2.0, BSD-3-Clause, BSD-2-Clause, ISC, Unlicense |
| Apache-2.0 | Apache-2.0, MIT, BSD-3-Clause, BSD-2-Clause, ISC |
| GPL-3.0 | GPL-3.0, AGPL-3.0 |
| BSD-3-Clause | BSD-3-Clause, BSD-2-Clause, MIT, Apache-2.0, ISC |
| ISC | ISC, MIT, BSD-3-Clause, BSD-2-Clause, Apache-2.0 |

## Commands Reference

| Command | Alias | Description |
|---------|-------|-------------|
| `generate` | `gen` | Generate a license file |
| `list` | - | List all available licenses |
| `info <license>` | - | Get information about a license |
| `check` | - | Check dependency license compatibility |
| `stats` | - | Show license statistics |

## Options

### Generate Command
- `-t, --type <type>` - License type (MIT, Apache-2.0, etc.)
- `-a, --author <author>` - Author name
- `-y, --year <year>` - Copyright year
- `-o, --output <path>` - Output path (default: ./LICENSE)

### Check/Stats Commands
- `-p, --path <path>` - Project path (default: ./)

## Examples

Generate MIT license:
```bash
license-gen gen -t MIT -a "John Doe"
```

Generate Apache license for 2023:
```bash
license-gen gen -t Apache-2.0 -a "Acme Corp" -y 2023
```

Check compatibility in specific project:
```bash
license-gen check -p /path/to/project
```

Get statistics for current project:
```bash
license-gen stats
```

## Requirements

- Node.js >= 14.0.0
- npm or yarn

## Development

Clone the repository:
```bash
git clone https://github.com/yourusername/license-gen.git
cd license-gen
```

Install dependencies:
```bash
npm install
```

Run locally:
```bash
node bin/cli.js generate
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Author

Created with ❤️ for the open-source community
