export type SymbolKind =
  | "vowel"
  | "stop"
  | "affricate"
  | "fricative"
  | "aspirate"
  | "nasal"
  | "liquid"
  | "semivowel";

export type Symbol =
  | "aa"
  | "ae"
  | "ah"
  | "ao"
  | "aw"
  | "ay"
  | "b"
  | "ch"
  | "d"
  | "dh"
  | "eh"
  | "er"
  | "ey"
  | "f"
  | "g"
  | "hh"
  | "ih"
  | "iy"
  | "jh"
  | "k"
  | "l"
  | "m"
  | "n"
  | "ng"
  | "ow"
  | "oy"
  | "p"
  | "r"
  | "s"
  | "sh"
  | "t"
  | "th"
  | "uh"
  | "uw"
  | "v"
  | "w"
  | "y"
  | "z"
  | "zh";

export const symbols: {
  [key in Symbol]: SymbolKind;
} = {
  aa: "vowel",
  ae: "vowel",
  ah: "vowel",
  ao: "vowel",
  aw: "vowel",
  ay: "vowel",
  b: "stop",
  ch: "affricate",
  d: "stop",
  dh: "fricative",
  eh: "vowel",
  er: "vowel",
  ey: "vowel",
  f: "fricative",
  g: "stop",
  hh: "aspirate",
  ih: "vowel",
  iy: "vowel",
  jh: "affricate",
  k: "stop",
  l: "liquid",
  m: "nasal",
  n: "nasal",
  ng: "nasal",
  ow: "vowel",
  oy: "vowel",
  p: "stop",
  r: "liquid",
  s: "fricative",
  sh: "fricative",
  t: "stop",
  th: "fricative",
  uh: "vowel",
  uw: "vowel",
  v: "fricative",
  w: "semivowel",
  y: "semivowel",
  z: "fricative",
  zh: "fricative",
};

export const vowelSymbols = Object.keys(symbols).filter((symbol) => (symbols as any)[symbol] === "vowel");
