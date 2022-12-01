import type { GuessType } from "./types";
import styles from "./Wordle.module.css";

type CurrentGuessProps = {
  guess: GuessType;
};

export default function CurrentGuess({ guess }: CurrentGuessProps) {
  return (
    <div className={`${styles.word} ${styles.currentGuess}`}>
      {Array.from({ length: 5 }).map((_, i) => {
        return (
          <span className={styles.char} key={i}>
            {guess[i] || ""}
          </span>
        );
      })}
    </div>
  );
}
