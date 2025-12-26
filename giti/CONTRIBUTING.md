# Contributing to License Generator & Checker

Thank you for considering contributing to this project!

## How to Contribute

### Reporting Bugs

If you find a bug, please open an issue with:
- A clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Your environment (OS, Node version)

### Suggesting Features

Feature suggestions are welcome! Please open an issue describing:
- The feature you'd like to see
- Why it would be useful
- How it should work

### Adding New Licenses

To add a new license:

1. Add the license template to `src/templates/licenses.js`:

```javascript
'LICENSE-KEY': {
  name: 'Full License Name',
  template: `License text with [year] and [fullname] placeholders`,
  compatible: ['MIT', 'Apache-2.0'],
  permissive: true, // or copyleft: true
}
```

2. Test the generation:
```bash
node bin/cli.js gen -t LICENSE-KEY -a "Test Author"
```

3. Update the README.md with the new license

### Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test your changes thoroughly
5. Commit with clear messages (`git commit -m 'Add amazing feature'`)
6. Push to your fork (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Code Style

- Use 2 spaces for indentation
- Use meaningful variable names
- Add comments for complex logic
- Keep functions focused and small

### Testing

Before submitting a PR, test:
- License generation for all types
- Compatibility checking
- Statistics generation
- Interactive mode

## Development Setup

```bash
git clone https://github.com/yourusername/license-gen.git
cd license-gen
npm install
```

Run locally:
```bash
node bin/cli.js [command]
```

## Questions?

Feel free to open an issue for any questions!
