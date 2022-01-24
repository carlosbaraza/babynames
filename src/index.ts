import { wordPronounciations } from "./cmudict";
import { getNames } from "./us-names/db-queries";
import { isPronounceSimilarlySpanish } from "./pronounciation/pronounciation";
import fs from "fs";
import path from "path";
import { spanishNamesMale } from "./spanish-names";

async function main() {
  const names = await getNames();
  const spanishNames = await spanishNamesMale;
  console.log("Total names: ", names.length);

  const exceptions = ["Nolan"];
  const MINIMUM_FREQUENCY = 100;
  const MINIMUM_FREQUENCY_US = 500;
  const MAXIMUM_FREQUENCY = 1000000;
  const MAXIMUM_FREQUENCY_US = 3000000;

  const goodNames = names
    // .slice(0, 1000)
    .filter((name) => name.sex === "M")
    .map((name) => {
      const pronounciation = wordPronounciations[name.name.toLowerCase()];
      return {
        ...name,
        pronounciation,
      };
    })
    .filter((name) => name.pronounciation)
    .map((name) => {
      const pronouncedSimilarlyInSpanish = isPronounceSimilarlySpanish(
        name.name,
        name.pronounciation
      );
      return {
        ...name,
        pronouncedSimilarlyInSpanish,
      };
    })
    .filter((name) => name.pronouncedSimilarlyInSpanish)
    .filter((name) => {
      if (exceptions.includes(name.name)) return true;
      if (name.total_count < MINIMUM_FREQUENCY_US) return false;
      if (name.total_count > MAXIMUM_FREQUENCY_US) return false;
      return true;
    })
    .map((name) => {
      const spanishName = spanishNames.find(
        (spanishName) => spanishName.name.toLowerCase() === name.name.toLowerCase()
      );
      return { ...name, spanishName };
    })
    .filter((name) => {
      if (exceptions.includes(name.name)) return true;
      if (!name.spanishName) return false;
      if (name.spanishName.frequency < MINIMUM_FREQUENCY) return false;
      if (name.spanishName.frequency > MAXIMUM_FREQUENCY) return false;
      return true;
    })
    .filter((name) => {
      if (exceptions.includes(name.name)) return true;
      const cleanName = name.name.trim().toLowerCase();
      if (cleanName.includes("h")) return false;
      if (cleanName.includes("y")) return false;
      if (cleanName.includes("kk")) return false;
      if (cleanName.includes("v")) return false;
      if (cleanName.includes("k")) return false;
      if (cleanName.includes("tt")) return false;
      if (cleanName.includes("ss")) return false;
      if (cleanName.includes("j")) return false;
      if (cleanName.includes("z")) return false;
      if (cleanName.includes("pp")) return false;
      if (cleanName.includes("ll")) return false;
      if (cleanName.includes("w")) return false;
      if (cleanName.startsWith("x")) return false;
      if (cleanName.includes("bb")) return false;
      return true;
    });
  // .filter((name) => {
  //   if (exceptions.includes(name.name)) return true;
  //   return name.name.length < 10;
  // });

  const sorted = goodNames.sort((a, b) => {
    // // by length and alphabet
    if (a.name.length !== b.name.length) return a.name.length - b.name.length;
    return a.name.localeCompare(b.name);

    // by US frequency
    // return b.total_count - a.total_count;

    // by spanish frequency
    return (b.spanishName?.frequency || 0) - (a.spanishName?.frequency || 0);
  });

  console.log("Total filtered: ", sorted.length);

  const output = sorted
    .map((name) => {
      // human readable number format
      const totalCount = name.total_count.toLocaleString("en-US");
      return `${name.name}${
        process.env.SURNAME ? ` ${process.env.SURNAME}` : ""
      } - US:${totalCount} - ES:${name.spanishName?.frequency.toLocaleString("en-US")}`;
    })
    .join("\n");

  console.log(output);
  fs.writeFileSync(
    path.join(__dirname, "../output/length-alphabetic-spanish-names.txt"),
    output,
    "utf8"
  );
}

main();
