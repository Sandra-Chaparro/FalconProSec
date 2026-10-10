/**
 * Registry of working tool components.
 *
 * To launch a tool:
 *   1. Build it as src/components/tools/<Name>.astro
 *   2. Import it here and map it to the tool's id from src/content/tools.json
 *   3. Set "status": "available" for that tool in tools.json
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TOOL_COMPONENTS: Record<string, any> = {
  // 'phishing-awareness-quiz': PhishingQuiz,
};
