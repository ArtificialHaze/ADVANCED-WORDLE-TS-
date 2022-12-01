import styles from "./Wordle.module.css";

export default function EmptyGuess() {
  return (
    <div className={styles.word}>
      {Array.from({ length: 5 }).map((_, i) => {
        return <span className={styles.char} key={i} />;
      })}
    </div>
  );
}
