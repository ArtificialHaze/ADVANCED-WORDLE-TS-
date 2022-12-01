import { useMemo, useState, useEffect } from "react";

export function useWordOfTheDay() {
  const [word, setWord] = useState<null | string>(null);

  useEffect(() => {
    async function fetchWord() {
      const response = await fetch("[FETCH_WORDS_FROM_DATABASE]").then((res) =>
        res.json()
      );

      setWord(response.word);
    }

    fetchWord();
  }, []);

  return word;
}

export function useCharCountMap(word: string | null) {
  return useMemo(() => {
    if (word === null) {
      return {};
    }
    return word.split("").reduce<Record<string, number>>((acc, char) => {
      if (!acc.hasOwnProperty(char)) {
        acc[char] = 1;
      } else {
        acc[char] += 1;
      }
      return acc;
    }, {});
  }, [word]);
}
