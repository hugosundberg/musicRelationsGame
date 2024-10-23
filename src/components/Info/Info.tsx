import { MouseEventHandler } from "react";
import styles from "./Info.module.css";

interface InfoProps {
  isVisible: boolean;
  closeInfo: MouseEventHandler<HTMLElement>;
}

const Info = ({ isVisible, closeInfo }: InfoProps) => {
  if (isVisible) {
    return (
      <>
        <div className={styles.overlay} onClick={closeInfo}></div>
        <div className={styles.infoContainer}>
          <div className={styles.infoHeader}>
            <i className="bi bi-x-circle" onClick={closeInfo}></i>
          </div>
          <h2>How To Play</h2>
          <ul>
            <li>Select a start artist and a target artist.</li>
            <li>
              Using as few guesses as possible, navigate through related artists
              from start to target.{" "}
            </li>
          </ul>
          <h2>Info</h2>
          <p>
            This game uses the Spotify WebAPI to fetch related artists. Visit{" "}
            <a href="https://hugosundberg.github.io/hugo/" target="_blank">
              my portfolio
            </a>{" "}
            for more.
          </p>
        </div>
      </>
    );
  }
};

export default Info;
