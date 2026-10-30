import { readFile } from "node:fs/promises";
import { argv } from "node:process";

const word = argv[2]?.toLowerCase();

if (!word) {
  console.error("Usage: npm run search -- <word>");
  process.exitCode = 1;
} else {
  const notes = JSON.parse(
    await readFile(
      new URL("./notes/keynote-highlights.json", import.meta.url),
      "utf8",
    ),
  );
  const matches = notes.highlights.filter(({ title, summary }) =>
    `${title} ${summary}`.toLowerCase().includes(word),
  );

  for (const { title, summary } of matches) {
    console.log(`${title}: ${summary}`);
  }
}
