import styles from "./GameHeader.module.css";

interface Artist {
  name: string;
  id: string;
  img: string;
}

interface GameHeaderProps {
  startArtist?: Artist;
  targetArtist?: Artist;
  guesses: number;
}

const GameHeader = ({
  startArtist,
  targetArtist,
  guesses,
}: GameHeaderProps) => {
  return (
    <div className={styles.gameHeaderContainer}>
      <h4>Use related artists to go from</h4>
      <div className={styles.artistContainer}>
        <div className={styles.artist}>
          {startArtist ? (
            <>
              <img src={startArtist.img} alt="" className={styles.smallImage} />
              <p>{startArtist.name}</p>
            </>
          ) : (
            "Starting artist"
          )}
        </div>
        <div>
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
      <div className={styles.guesses}>
        <p>Guesses</p>
        <h2>{guesses}</h2>
      </div>
    </div>
  );
};

export default GameHeader;
