import { MouseEventHandler } from "react";
import styles from "./StartScreen.module.css";

interface StartScreenProps {
  isVisible: boolean;
  onClick: MouseEventHandler<HTMLElement>;
}

const StartScreen = ({ isVisible, onClick }: StartScreenProps) => {
  if (isVisible)
    return (
      <div className={styles.startScreen}>
        <h2>Welcome!</h2>
        <p>
          When the game starts you will be prompted with a selection of artists.
          Your objective is to go from start artist to target artist using as
          few guesses as possible.
        </p>
        <button className={styles.button} onClick={onClick}>
          Create new game
        </button>
      </div>
    );
};

export default StartScreen;
