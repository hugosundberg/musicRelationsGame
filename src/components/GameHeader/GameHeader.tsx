import "./GameHeader.css";

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
    <div className="game-header-container">
      <h4>Use related artists to go from</h4>
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
        <div>
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
      <div className="guesses">
        <p>Guesses</p>
        <h2>{guesses}</h2>
      </div>
    </div>
  );
};

export default GameHeader;
