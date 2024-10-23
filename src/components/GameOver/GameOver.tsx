import styles from "./GameOver.module.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { MouseEventHandler } from "react";

interface Artist {
  name: string;
  id: string;
  img: string;
}

interface GameOverProps {
  startArtist?: Artist;
  targetArtist?: Artist;
  guesses: number;
  closeGameOver: MouseEventHandler;
  isVisible: boolean;
}

const GameOver = ({
  startArtist,
  targetArtist,
  guesses,
  closeGameOver,
  isVisible,
}: GameOverProps) => {
  if (isVisible)
    return (
      <>
        <div className={styles.overlay} onClick={closeGameOver}></div>
        <div className={styles.gameOverContainer}>
          <div className={styles.gameOverHeader}>
            <i className="bi bi-x-circle" onClick={closeGameOver}></i>
          </div>
          <h2>Congratulations! You did it!</h2>
          <div className={styles.artistContainer}>
            <div className={styles.artist}>
              {startArtist ? (
                <>
                  <img
                    src={startArtist.img}
                    alt=""
                    className={styles.smallImage}
                  />
                  <p>{startArtist.name}</p>
                </>
              ) : (
                "Starting artist"
              )}
            </div>
            <div className={styles.arrow}>
              <i className="bi bi-arrow-right"></i>
            </div>
            <div className={styles.artist}>
              {targetArtist ? (
                <>
                  <img
                    src={targetArtist.img}
                    alt=""
                    className={styles.smallImage}
                  />
                  <p>{targetArtist.name}</p>
                </>
              ) : (
                "Target artist"
              )}
            </div>
          </div>
          {"You won in " + guesses + " guesses"}
        </div>
      </>
    );
};

export default GameOver;
