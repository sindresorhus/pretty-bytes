# Contributing

Thank you for considering contributing to pretty-bytes!

## Development

1. Fork this repository and clone it to your local machine
2. Install dependencies with `npm install`
3. Make your changes
4. Run tests with `npm test`
5. Submit a pull request

## Pull Request Guidelines

- Follow the existing code style and formatting (using XO)
- Add or update tests for your changes
- Ensure all tests pass locally before submitting
- Keep your PR focused on a single topic
- Update documentation if necessary

## Testing

We use AVA for testing. Run the test suite with:

```sh
npm test
```

This will run the linter (XO), tests (AVA) and TypeScript definition tests (TSD).

## Release Process

The package release is handled by the maintainers using:

1. Update version in package.json
2. Create a Git tag
3. Push to GitHub
4. Publish to npm
