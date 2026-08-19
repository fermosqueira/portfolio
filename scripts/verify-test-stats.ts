import { execSync } from "node:child_process";
import { TEST_STATS } from "../lib/content/schema";

/**
 * The hero shows a real, specific claim — "29 passed" — pulled from
 * TEST_STATS in schema.ts. That number is exactly the kind of thing a QA
 * hiring manager checks, so it can't be allowed to quietly drift from the
 * actual suite. This asks Playwright itself how many tests exist right now
 * and fails if schema.ts disagrees.
 */
function main() {
  const output = execSync("npx playwright test --list", { encoding: "utf8" });

  const match = output.match(/Total:\s*(\d+)\s*tests?\s*in\s*(\d+)\s*files?/i);
  if (!match) {
    throw new Error(`Could not parse \`playwright test --list\` output:\n${output}`);
  }

  const passed = Number(match[1]);
  const specFiles = Number(match[2]);

  if (passed !== TEST_STATS.passed || specFiles !== TEST_STATS.specFiles) {
    console.error(
      `lib/content/schema.ts says ${TEST_STATS.passed} tests in ${TEST_STATS.specFiles} files, ` +
        `but the suite now has ${passed} tests in ${specFiles} files.\n` +
        `Update TEST_STATS in lib/content/schema.ts, then run 'npm run cv' and commit.`,
    );
    process.exit(1);
  }

  console.log(`Hero stat verified: ${passed} tests across ${specFiles} spec files.`);
}

main();
