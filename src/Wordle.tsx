import { useCallback, useEffect, useState } from "react";
import Keyboard from "./Keyboard";
import styles from "./Wordle.module.css";
import { useWordOfTheDay, useCharCountMap } from "./CustomHooks";
import { EmptyGuess, CurrentGuess, SubmittedGuesses } from "./utils";

const totalGuessMax = 6;

export default function Wordle() {
  const [submittedGuesses, setSubmittedGuesses] = useState<string[][]>([]);
  const [guess, setGuess] = useState<string[]>([]);

  const wordOfTheDay = useWordOfTheDay();

  const handleKeyInput = useCallback(
    (key: string) => {
      const isChar = /^[a-z]$/.test(key);
      const isBackspace = key === "Backspace";
      const isSubmit = key === "Enter";
      const isGuessFinished = guess.length === 5;

      if (isBackspace) {
        setGuess((prev) => {
          const temp = [...prev];
          temp.pop();
          return temp;
        });
      } else if (isChar && !isGuessFinished) {
        setGuess((prev) => [...prev, key]);
      } else if (isGuessFinished && isSubmit) {
        setSubmittedGuesses((prev) => [...prev, guess]);
        setGuess([]);
      }
    },
    [guess]
  );

  useEffect(() => {
    function handleKeyDown({ key }: { key: string }) {
      handleKeyInput(key);
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [guess.length, guess, handleKeyInput]);

  const puzzleWordCharCount = useCharCountMap(wordOfTheDay);

  if (wordOfTheDay === null) {
    return <p>Loading...</p>;
  }

  const isCorrect =
    submittedGuesses.length > 0 &&
    submittedGuesses[submittedGuesses.length - 1].join("") === wordOfTheDay;

  const isFailure = !isCorrect && submittedGuesses.length === totalGuessMax;

  return (
    <div className={styles.wordle}>
      <h1 className={styles.title}>Wordleish</h1>
      <div className={styles.boardPositioner}>
        <div className={styles.wordleBoard}>
          <SubmittedGuesses
            submittedGuesses={submittedGuesses}
            puzzleWord={wordOfTheDay}
            puzzleWordCharCount={puzzleWordCharCount}
          />
          {!isFailure && !isCorrect && <CurrentGuess guess={guess} />}
          {Array.from({
            length:
              totalGuessMax - submittedGuesses.length - (isCorrect ? 0 : 1),
          }).map((_, i) => {
            return <EmptyGuess key={i} />;
          })}
          {isCorrect && (
            <div className={`${styles.message}`}>
              You did it! Congratulations!
            </div>
          )}
          {isFailure && (
            <div className={`${styles.message}`}>You've failed, try again!</div>
          )}
        </div>
      </div>
      <Keyboard keyPressHandler={handleKeyInput} />
    </div>
  );
}
