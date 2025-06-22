Product Design Document: Paste to Markdown
==========================================

**Author:** Gemini **Date:** June 22, 2025 **Version:** 1.1

1\. Overview
------------

### 1.1. The Product

**Paste to Markdown** is a utility extension for Raycast that instantly converts rich text or HTML content from the user's clipboard into clean, well-formatted Markdown.

### 1.2. The Problem

Developers, writers, and knowledge workers frequently copy content from various sources, primarily web pages. This content often carries unwanted HTML styling, which needs to be manually stripped and reformatted into Markdown for use in code editors, note-taking apps (like Obsidian, Notion, Bear), or content management systems. This manual process is tedious, error-prone, and interrupts workflow.

### 1.3. The Solution

This extension provides a simple, fast Raycast command to automate the conversion process. With a single action, a user can take the HTML content residing in their clipboard, convert it to high-quality Markdown using the modern **Turndown** library, and paste it directly into the active application.

### 1.4. Target Audience

-   **Software Developers:** For pasting documentation, code snippets, and web articles into READMEs, wikis, and project notes.

-   **Writers & Content Creators:** For gathering research from the web and formatting it for blog posts or articles.

-   **Students & Researchers:** For taking notes from online sources and organizing them in Markdown-based apps.

-   **Product Managers & Knowledge Workers:** For clipping information from various sources into internal documentation, wikis, and project management tools.

2\. Goals & Guiding Principles
------------------------------

-   **Speed and Efficiency:** The core interaction should be near-instantaneous, saving users time on every use.

-   **High-Quality Conversion:** Leverage the `Turndown` library and its GFM (GitHub Flavored Markdown) plugin to ensure modern, accurate conversions, especially for complex elements like tables, code blocks, and checklists.

-   **Seamless Integration:** The extension must feel like a native part of the Raycast ecosystem, adhering strictly to Raycast's UI/UX guidelines.

-   **User Control:** Provide sensible defaults but allow users to customize the Markdown output via preferences to fit their specific needs.

-   **Reliability:** Implement robust error handling to gracefully manage non-HTML clipboard content or other edge cases.

3\. Features & Functionality
----------------------------

### 3.1. Core Command

1.  **Paste as Markdown**

    -   **Action:** Reads the HTML content from the clipboard, converts it to Markdown, and immediately pastes the result into the frontmost application.

    -   **User Feedback:** A confirmation HUD (`Toast`) message, e.g., "Pasted as Markdown".

    -   **Alias:**  `pmd`

### 3.2. Extension Preferences

Users will be able to configure the extension's behavior via Raycast's Preferences pane. This directly controls the options passed to the `Turndown` service.

-   **Heading Style:** Choose between `atx` (e.g., `## Heading`) or `setext` (e.g., `Heading\n---`). Default: `atx`.

-   **Bullet List Marker:** Choose `*`, `-`, or `+`. Default: `*`.

-   **Code Block Style:** Choose fenced code blocks () or indented. Default: Fenced.

-   **Link Style:** Choose `inlined` or `referenced`. Default: `inlined`.

-   **Enable GFM:** A boolean toggle to enable/disable GitHub Flavored Markdown features (tables, strikethrough, task lists). Default: `true`.

4\. User Experience (UX) & Design
---------------------------------

-   **Icon:** A simple, recognizable icon that combines a clipboard element with the Markdown symbol (M↓).

-   **Command Naming:** Clear, action-oriented name that is easily discoverable.

-   **Feedback:** All feedback will use native Raycast components (`Toast`) for a consistent and non-intrusive experience.

-   **Onboarding:** The Raycast Store description will clearly articulate the problem and solution, list the feature, and include a GIF demonstrating the command in action.

5\. Technical Implementation
----------------------------

This section outlines the technical stack and architecture, replacing the outdated `to-markdown` library from the example with `Turndown`.

-   **Language:** TypeScript (Standard for Raycast extensions)

-   **Framework:** Node.js

-   **Core Dependencies:**

    -   `@raycast/api`: For all interactions with the Raycast environment (clipboard, UI, etc.).

    -   `turndown`: The core HTML-to-Markdown conversion library.

    -   `turndown-plugin-gfm`: To provide support for GitHub Flavored Markdown.

### 5.1. Core Logic Flow (`Paste as Markdown`)

```
// 1. Import necessary modules from Raycast API and Turndown
import { Clipboard, getPreferenceValues, paste, showHUD } from "@raycast/api";
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";

// Define the shape of the preferences object
interface Preferences {
  headingStyle: "setext" | "atx";
  bulletListMarker: "*" | "-" | "+";
  codeBlockStyle: "indented" | "fenced";
  linkStyle: "inlined" | "referenced";
  enableGfm: boolean;
}

// 2. Define the main command function
export default async function Command() {
  try {
    // 3. Get user preferences
    const preferences = getPreferenceValues<Preferences>();

    // 4. Initialize and configure Turndown service
    const turndownService = new TurndownService({
      headingStyle: preferences.headingStyle,
      bulletListMarker: preferences.bulletListMarker,
      codeBlockStyle: preferences.codeBlockStyle,
      linkStyle: preferences.linkStyle,
    });

    // 5. Add GFM plugin if enabled
    if (preferences.enableGfm) {
      turndownService.use(gfm);
    }

    // 6. Read HTML content directly from the clipboard
    const { html } = await Clipboard.read();

    if (!html || html.trim() === '') {
        // Handle case where clipboard has no HTML content
        await showHUD("Clipboard does not contain formattable content.");
        return;
    }

    // 7. Perform the conversion
    const markdown = turndownService.turndown(html);

    // 8. Paste the result and show confirmation
    await paste(markdown);
    await showHUD("Pasted as Markdown");

  } catch (error) {
    console.error(error);
    await showHUD("Error: Could not convert clipboard content.");
  }
}

```

### 5.2. File Structure

```
/
├── assets/
│   └── icon.png
├── src/
│   └── paste-as-markdown.tsx
├── package.json
└── tsconfig.json

```

6\. Distribution & Marketing
----------------------------

-   **Primary Channel:** The official Raycast Extension Store.

-   **Store Listing:** The listing will feature a clear title, a concise description, an animated GIF, and a list of all configurable options.

-   **Discovery:**

    -   Post on social media (Twitter/X, LinkedIn) targeting developer and writer communities.

    -   Submit to relevant subreddits like `r/raycast`, `r/markdown`, `r/productivityapps`.

    -   Create an open-source GitHub repository (inspired by the example) to foster community trust, gather feedback, and accept contributions.

7\. Future Enhancements (Roadmap)
---------------------------------

-   **v1.1:**

    -   **Image Handling:** Add an option for how to handle `<img>` tags: strip them, keep the original link, or attempt to download and link them locally (advanced).

-   **v1.2:**

    -   **Custom Turndown Rules:** Allow advanced users to add their own `turndown.addRule()` configurations via a JSON file in the extension's support directory.

-   **v1.3:**

    -   **LLM-Powered Cleanup (Optional):** Integrate with the Raycast AI API to offer an optional "Smart Clean" action that uses an LLM to fix semantic issues or rephrase poorly formatted sections of the converted Markdown.

8\. Appendix: Key Resources
---------------------------

-   **Raycast API Documentation:**  <https://developers.raycast.com/>

-   **Raycast Extension Guidelines:**  <https://manual.raycast.com/extensions>

-   **Turndown Library:**  <https://github.com/mixmark-io/turndown>

-   **Inspiration/Example Repo:**  <https://github.com/euangoddard/clipboard2markdown>