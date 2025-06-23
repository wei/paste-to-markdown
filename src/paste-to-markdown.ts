import { Clipboard, getPreferenceValues, showHUD } from "@raycast/api";
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

// Main command function
export default async function Command() {
  try {
    // Get user preferences
    const preferences = getPreferenceValues<Preferences>();

    // Initialize and configure Turndown service
    const turndownService = new TurndownService({
      headingStyle: preferences.headingStyle,
      bulletListMarker: preferences.bulletListMarker,
      codeBlockStyle: preferences.codeBlockStyle,
      linkStyle: preferences.linkStyle,
    });

    // Add GFM plugin if enabled
    if (preferences.enableGfm) {
      turndownService.use(gfm);
    }

    // Read content from the clipboard
    let clipboardContent;
    try {
      clipboardContent = await Clipboard.read();
    } catch (error) {
      console.error("Failed to read clipboard:", error);
      await showHUD("Error: Could not access clipboard.");
      return;
    }

    const { html, text } = clipboardContent;

    // Check if we have HTML content to convert
    if (!html || html.trim() === "") {
      // If no HTML but we have text, check if it might be plain text
      if (text && text.trim() !== "") {
        await showHUD("Clipboard contains plain text, no conversion needed.");
      } else {
        await showHUD("Clipboard does not contain formattable content.");
      }
      return;
    }

    // Perform the conversion
    let markdown;
    try {
      markdown = turndownService.turndown(html);
    } catch (error) {
      console.error("Failed to convert HTML to Markdown:", error);
      await showHUD("Error: Could not convert HTML content.");
      return;
    }

    // Check if conversion resulted in meaningful content
    if (!markdown || markdown.trim() === "") {
      await showHUD("Conversion resulted in empty content.");
      return;
    }

    // Paste the result and show confirmation
    try {
      await Clipboard.paste(markdown);
      await showHUD("Pasted as Markdown");
    } catch (error) {
      console.error("Failed to paste content:", error);
      await showHUD("Error: Could not paste converted content.");
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    await showHUD("Error: An unexpected error occurred.");
  }
}
