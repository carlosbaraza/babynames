import { Symbol, symbols, vowelSymbols } from "./symbols";
import { similarVowels } from "./symbols-similar";

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

type Vowel = "a" | "e" | "i" | "o" | "u" | "y";

export function isPronounceSimilarlySpanish(name: string, engPro: string): boolean {
  const cleanName = name.toLowerCase().trim();
  const cleanEngPro = engPro.toLowerCase().trim();
  const vowels = cleanName.match(/[aeiouy]/gi) as Array<Vowel> | null;
  if (!vowels) return false;

  const pronounciationParts = cleanEngPro.split(" ");
  const pronounciationPartsWithoutNumbers = pronounciationParts
    .map((part) => part.trim().match(/[a-z]+/gi)?.[0])
    .filter(notEmpty);

  const vowelPronounciationParts = pronounciationPartsWithoutNumbers.filter((part) =>
    vowelSymbols.includes(part)
  );

  // iterate vowels with index
  const vowelComparison: Array<{ vowel: Vowel; pronounciation: string; similar: boolean }> =
    vowels.map((vowel, index) => {
      const vowelPronounciationPart = vowelPronounciationParts[index] as Symbol | undefined;
      if (!vowelPronounciationPart)
        return {
          vowel,
          pronounciation: "",
          similar: false,
        };

      const similar = similarVowels[vowel].includes(vowelPronounciationPart);
      return {
        vowel,
        pronounciation: vowelPronounciationPart,
        similar,
      };
    });

  const allVowelsSimilar = vowelComparison.every((vowelComparison) => vowelComparison.similar);
  if (!allVowelsSimilar) return false;

  if (cleanName.startsWith("h")) return false;

  return allVowelsSimilar;
}
