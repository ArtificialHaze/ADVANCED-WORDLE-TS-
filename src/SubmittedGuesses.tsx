import type { PuzzleWordCharCountType } from "./types";
import SubmittedGuess from "./SubmittedGuess";

type SubmittedGuessesProps = {
  submittedGuesses: string[][];
  puzzleWord: string;
  puzzleWordCharCount: PuzzleWordCharCountType;
};

export default function SubmittedGuesses({
  submittedGuesses,
  puzzleWord,
  puzzleWordCharCount,
}: SubmittedGuessesProps) {
  return (
    <>
      {submittedGuesses.map((guess, i) => {
        return (
          <SubmittedGuess
            puzzleWord={puzzleWord}
            guess={guess}
            puzzleWordCharCount={puzzleWordCharCount}
            key={i}
          />
        );
      })}
    </>
  );
}
