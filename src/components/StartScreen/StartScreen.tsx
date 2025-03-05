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
        <h2>Update</h2>
        <p>As of November 2024, Spotify has deprecated the Related Artist API endpoint, effectively causing this app to lose its core functionality. If Spotify decides to re-enable the endpoint, this app will be up and running again! Feel free to visit my <a href="hugosundberg.github.io/hugo">portfolio website</a> to try out my other apps!</p>
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
