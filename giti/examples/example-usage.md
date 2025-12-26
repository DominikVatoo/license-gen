# Example Usage

## Basic Examples

### Generate a MIT License

```bash
license-gen generate --type MIT --author "John Doe"
```

Output:
```
✔ License generated successfully!
License: MIT License
Path: /path/to/project/LICENSE
```

### Interactive License Selection

```bash
license-gen generate
```

You'll be prompted to:
1. Select a license from the list
2. Enter your name
3. Confirm the year

### Generate License in Custom Location

```bash
license-gen gen -t Apache-2.0 -a "Acme Corp" -o ./docs/LICENSE.txt
```

## Advanced Examples

### Check Project Compatibility

For a project with MIT license:

```bash
cd my-project
license-gen check
```

Example output for compatible project:
```
✔ Check complete!

Project License: MIT
Total Dependencies: 42

✅ All dependencies are compatible!
```

Example output with issues:
```
✔ Check complete!

Project License: GPL-3.0
Total Dependencies: 42

❌ Incompatible Licenses Found (2):

  • MIT - Not compatible with project license
  • Apache-2.0 - Not compatible with project license

⚠️  Warnings (1):

  • BSD-3-Clause - Permissive license in copyleft project - usually OK but review carefully

❌ Incompatible licenses detected!
```

### View License Statistics

```bash
license-gen stats
```

Output:
```
✔ Analysis complete!

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

### Get License Information

```bash
license-gen info GPL-3.0
```

Output:
```
GNU General Public License v3.0

Type: Copyleft

Compatible with:
  • GPL-3.0
  • AGPL-3.0
```

## CI/CD Integration

### GitHub Actions

Add to `.github/workflows/license-check.yml`:

```yaml
name: License Check

on: [push, pull_request]

jobs:
  license-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npx license-gen check
```

### Pre-commit Hook

Add to `.git/hooks/pre-commit`:

```bash
#!/bin/sh
npx license-gen check
if [ $? -ne 0 ]; then
  echo "License compatibility check failed!"
  exit 1
fi
```

Make it executable:
```bash
chmod +x .git/hooks/pre-commit
```

## NPM Scripts

Add to your `package.json`:

```json
{
  "scripts": {
    "license:check": "license-gen check",
    "license:stats": "license-gen stats",
    "license:generate": "license-gen generate"
  }
}
```

Then run:
```bash
npm run license:check
npm run license:stats
```

## Use Cases

### Starting a New Project

```bash
mkdir my-new-project
cd my-new-project
npm init -y
license-gen generate
```

### Auditing an Existing Project

```bash
cd existing-project
license-gen stats
license-gen check
```

### Changing Project License

```bash
license-gen generate --type Apache-2.0 --author "Your Name"
license-gen check
```

### Comparing Licenses

```bash
license-gen info MIT
license-gen info Apache-2.0
license-gen info GPL-3.0
```

## Tips

1. **Always check compatibility** before publishing your project
2. **Review warnings** even if no incompatibilities are found
3. **Update your package.json** license field to match your LICENSE file
4. **Document license choices** in your README
5. **Run checks regularly** as dependencies change
