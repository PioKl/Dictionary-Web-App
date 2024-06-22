export interface Word {
  word: string;
  phonetic?: string; //?: właściwość opcjonalna.
  phonetics: { text: string; audio: string }[];
  meanings: {
    partOfSpeech: string;
    definitions: { definition: string; example?: string }[];
    synonyms: string[];
  }[];
  sourceUrls: string;
}

export interface NoWordFound {
  title: string;
  message: string;
  resolution: string;
}
