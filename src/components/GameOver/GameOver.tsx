import "./GameOver.css";
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
        <div className="overlay" onClick={closeGameOver}></div>
        <div className="game-over-container">
          <div className="game-over-header">
            <i className="bi bi-x-circle" onClick={closeGameOver}></i>
          </div>
          <h2>Congratulations! You did it!</h2>
          <div className="artist-container">
            <div className="artist">
              {startArtist ? (
                <>
                  <img src={startArtist.img} alt="" className="small-image" />
                  <p>{startArtist.name}</p>
                </>
              ) : (
                "Starting artist"
              )}
            </div>
            <div className="arrow">
              <i className="bi bi-arrow-right"></i>
            </div>
            <div className="artist">
              {targetArtist ? (
                <>
                  <img src={targetArtist.img} alt="" className="small-image" />
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
