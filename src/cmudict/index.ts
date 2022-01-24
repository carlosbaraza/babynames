import { readFileSync } from "fs";
import path from "path";

const DIC_PATH = path.join(__dirname, "cmudict-0.7b");
const DIC_PHONES_PATH = path.join(__dirname, "cmudict-0.7b.phones");
const DIC_SYMBOLS_PATH = path.join(__dirname, "cmudict-0.7b.symbols");

export const wordPronounciations = readFileSync(DIC_PATH, "utf8")
  .split("\n")
  .filter((line) => {
    if (!line) return false;
    const startsWithLetter = line[0].match(/[A-Z]/);
    return startsWithLetter && line.length > 0;
  })
  .map((line) => {
    // get words from line divided by variable number of spaces
    const words = line.split(/\s+/);
    const word = words[0].toLowerCase();
    const pronounciation = words.slice(1).join(" ").toLowerCase();
    return { word, pronounciation };
  })
  .reduce((acc, curr) => {
    acc[curr.word] = curr.pronounciation;
    return acc;
  }, {} as { [word: string]: string });
