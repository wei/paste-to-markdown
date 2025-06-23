# Paste to Markdown

Paste to Markdown is a utility extension for Raycast that instantly converts rich text or HTML content from the user's clipboard into clean, well-formatted Markdown.

## Features

- **Instant Conversion**: Convert HTML clipboard content to Markdown with a single command
- **Smart Detection**: Automatically detects HTML content in clipboard and provides helpful feedback for plain text
- **Customizable Output**: Configure Markdown formatting through Raycast preferences
- **GitHub Flavored Markdown**: Support for tables, strikethrough, and task lists
- **Robust Error Handling**: Graceful handling of edge cases with clear user feedback
- **Command Alias**: Quick access with the `pmd` alias

## Usage

1. Copy any HTML content from a webpage, email, or document
2. Run the "Paste to Markdown" command in Raycast (or use the `pmd` alias)
3. The converted Markdown will be automatically pasted into your active application
4. A confirmation HUD message will appear to confirm the action

## Preferences

Customize the Markdown output through Raycast's Preferences pane:

### Heading Style

- **ATX** (default): `## Heading`
- **Setext**: `Heading\n---`

### Bullet List Marker

- **Asterisk** (default): `*`
- **Hyphen**: `-`
- **Plus**: `+`

### Code Block Style

- **Fenced** (default): ` ```code``` `
- **Indented**: 4-space indentation

### Link Style

- **Inline** (default): `[text](url)`
- **Referenced**: `[text][ref]`

### GitHub Flavored Markdown

- **Enabled** (default): Supports tables, strikethrough, and task lists
- **Disabled**: Standard Markdown only

## Technical Details

- Built with TypeScript for Raycast
- Uses the [Turndown](https://github.com/mixmark-io/turndown) library for HTML-to-Markdown conversion
- Includes [turndown-plugin-gfm](https://github.com/mixmark-io/turndown-plugin-gfm) for GitHub Flavored Markdown support
- Follows Raycast extension best practices and conventions

## Error Handling

The extension provides clear feedback for various scenarios:

- No HTML content in clipboard
- Plain text content (no conversion needed)
- Conversion errors
- Clipboard access issues
- Paste operation failures

## Development

To develop this extension locally:

```bash
# Install dependencies
npm install

# Start development mode
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Fix linting issues
npm run fix-lint
```

## License

MIT
