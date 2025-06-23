# Paste to Markdown Changelog

## [1.0.0] - 2025-06-22

### Added

- Initial release of Paste to Markdown extension
- Core functionality to convert HTML clipboard content to Markdown
- Support for Turndown library with GitHub Flavored Markdown plugin
- Comprehensive preferences system with 5 customizable options:
  - Heading style (ATX/Setext)
  - Bullet list marker (\*/−/+)
  - Code block style (fenced/indented)
  - Link style (inline/referenced)
  - GitHub Flavored Markdown toggle
- Command alias `pmd` for quick access
- Robust error handling with user-friendly feedback messages
- Smart clipboard content detection
- Automatic pasting to active application
- HUD confirmation messages
- Full TypeScript implementation following Raycast best practices

### Technical Details

- Built with TypeScript and Node.js
- Uses Turndown 7.2.0 for HTML-to-Markdown conversion
- Includes turndown-plugin-gfm 1.0.2 for GFM support
- Follows Raycast extension guidelines and conventions
- Comprehensive error handling for edge cases
- ESLint and Prettier integration for code quality
