import { Symbol } from "./symbols";

export const similarVowels: {
  [key in "a" | "e" | "i" | "o" | "u" | "y"]: Symbol[];
} = {
  a: ["aa", "ae", "ah", "ao", "aw", "ay", "er"],
  e: ["eh", "er", "ey"],
  i: ["ih", "iy", "y"],
  o: ["ow", "oy", "ao"],
  u: ["uh", "uw"],
  y: ["y", "ih", "iy"],
};
