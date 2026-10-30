import { readFile } from "node:fs/promises";

const notes = JSON.parse(
  await readFile(new URL("./notes/keynote-highlights.json", import.meta.url), "utf8"),
);
const highlightsByTopic = new Map();

for (const { topic, title } of notes.highlights) {
  const titles = highlightsByTopic.get(topic) ?? [];
  titles.push(title);
  highlightsByTopic.set(topic, titles);
}

const output = [];
for (const [topic, titles] of highlightsByTopic) {
  output.push(topic, ...titles.map((title) => `- ${title}`), "");
}

console.log(output.join("\n").trimEnd());
