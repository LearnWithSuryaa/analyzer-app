# Contributing to Javanese Krama Analyzer

Thank you for your interest in contributing to the Javanese Krama Analyzer project! 🎉

## 🚀 Getting Started

### Prerequisites

- Node.js 14.0 or higher
- npm or yarn
- Git

### Setup Development Environment

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/analyzer-app.git
   cd analyzer-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📁 Project Structure

This is a monorepo with the following structure:

```
analyzer-app/
├── packages/
│   ├── core/              # @javanese-ai/core - Core analyzer logic
│   └── create-app/        # CLI tool for scaffolding
└── web/                   # Next.js web application
```

## 🛠️ Development Workflow

### Running the Development Server

```bash
npm run dev
```

This will start the Next.js development server at `http://localhost:3000`.

### Building the Project

```bash
# Build all workspaces
npm run build

# Build specific workspace
npm run build --workspace=packages/core
```

### Testing Your Changes

Before submitting a PR, please ensure:

1. The project builds successfully
2. All existing features still work
3. Your code follows the existing style
4. You've tested your changes locally

## 📝 Coding Guidelines

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid using `any` type when possible

### Code Style

- Follow the existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

### Commit Messages

Use clear and descriptive commit messages:

```
feat: add new feature
fix: resolve bug in analyzer
docs: update README
style: format code
refactor: restructure parser logic
test: add unit tests
```

## 🎯 Areas for Contribution

### Core Analyzer (`packages/core`)

- Improve grammar rules
- Add more Javanese words to the dictionary
- Enhance Unggah-Ungguh validation
- Optimize parsing performance

### Web Application (`web`)

- UI/UX improvements
- New visualizations
- Accessibility enhancements
- Performance optimizations

### Documentation

- Improve README
- Add code examples
- Create tutorials
- Translate documentation

### CLI Tool (`packages/create-app`)

- Add more template options
- Improve error handling
- Enhance user experience

## 🐛 Reporting Bugs

If you find a bug, please create an issue with:

1. A clear title and description
2. Steps to reproduce
3. Expected vs actual behavior
4. Screenshots (if applicable)
5. Your environment (OS, Node version, etc.)

## 💡 Suggesting Features

We welcome feature suggestions! Please:

1. Check if the feature has already been requested
2. Clearly describe the feature and its benefits
3. Provide examples of how it would work
4. Explain why it would be useful

## 📤 Submitting Pull Requests

1. Ensure your code follows the guidelines above
2. Update documentation if needed
3. Test your changes thoroughly
4. Create a pull request with:
   - Clear title and description
   - Reference to related issues
   - Screenshots/videos (if UI changes)

### PR Review Process

- Maintainers will review your PR
- Address any feedback or requested changes
- Once approved, your PR will be merged

## 🌟 Recognition

Contributors will be recognized in:

- README acknowledgments
- Release notes
- Project documentation

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 💬 Questions?

Feel free to:

- Open an issue for questions
- Reach out to [@LearnWithSuryaa](https://github.com/LearnWithSuryaa)

---

Thank you for contributing to preserve and promote Javanese language and culture! ❤️
