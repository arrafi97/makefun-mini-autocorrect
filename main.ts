// make.fun Mini entry: "Funniest Autocorrect Fail"
// A tiny Node 22 program (standard library only, no network). It writes a
// single line, under 200 characters, that reads as a funny autocorrect
// fail to <output>/entry.txt and reports its length.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The fail: one wrong letter turns a budget review into a barbecue, and
// the boss now expects sausages instead of spreadsheets. The slip is
// clear in one read: noon becomes meat.
const LINE =
  "Autocorrect changed 'let's meet at noon' to 'let's meat at noon', and now my boss thinks I'm organising a barbecue instead of a budget review.";

// The bounty's gate: UTF-8 text, 1 to 199 characters, exactly one line,
// and not blank. Count code points, not UTF-16 units.
function checkLine(text: string): number {
  const n = [...text].length;
  if (text.trim() === "" || n < 1 || n > 199 || text.includes("\n")) {
    throw new Error(`line must be one line of 1-199 characters, got ${n}`);
  }
  return n;
}

const chars = checkLine(LINE);

// Write the line. The output directory comes from $MAKEFUN_OUTPUT_DIR
// when set, otherwise /output. The file holds exactly the line — no
// trailing newline — so two runs always produce byte-identical files.
// A trailing newline would change the byte count, so there is none.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");
mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, LINE, "utf8");
console.log(`wrote entry.txt (${chars} chars)`);
