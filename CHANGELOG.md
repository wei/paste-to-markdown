# Paste to Markdown Changelog

## [1.0.0] - 2025-06-23

### Added

- Core functionality to convert HTML clipboard content to Markdown
- Support for Turndown library for HTML-to-Markdown conversion
- Comprehensive preferences system with 9 customizable options:
  - Heading style (ATX/Setext) - defaults to ATX
  - Horizontal rule style customization - defaults to "---"
  - Bullet list marker (\*/−/+) - defaults to "-"
  - Code block style (fenced/indented) - defaults to fenced
  - Code fence style selection (backticks vs tildes) - defaults to backticks
  - Emphasis delimiter choice (underscore vs asterisk) - defaults to underscore
  - Strong delimiter choice (double asterisk vs double underscore) - defaults to double asterisk
  - Link style (inline/referenced) - defaults to inline
  - Link reference style options (full, collapsed, shortcut) - defaults to full
- Command alias `pmd` for quick access
- Robust error handling with user-friendly HUD feedback messages
- Smart clipboard content detection
- Automatic pasting to active application
- Enhanced preferences UI with comprehensive formatting options
- Full TypeScript implementation following Raycast best practices

### Technical Details

- Built with TypeScript and Node.js
- Uses Turndown for HTML-to-Markdown conversion
- Follows Raycast extension guidelines and conventions
- Comprehensive error handling for edge cases
- ESLint and Prettier integration for code quality
