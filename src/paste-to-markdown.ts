import { execSync } from "child_process";
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

async function getClipboardHTML(): Promise<string | null> {
  // Helper function to get HTML from clipboard using AppleScript as @raycast/api clipboard does not read HTML from the clipboard properly
  // const { html, text } = await Clipboard.read();

  try {
    const result = execSync(
      `osascript -e 'the clipboard as «class HTML»' | perl -ne 'print chr foreach unpack("C*",pack("H*",substr($_,11,-3)))'`,
      { encoding: "utf8", timeout: 5000 }
    );
    return result.trim() || null;
  } catch (error) {
    console.error("Failed to get HTML via AppleScript:", error);
    return null;
  }
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

    console.debug("Trying AppleScript method to get HTML...");
    const html = await getClipboardHTML();
    if (html && html.trim() !== "") {
      console.debug("Found HTML via AppleScript:", html.substring(0, 100) + "...");
    } else {
      await showHUD("Clipboard does not contain formattable content.");
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
