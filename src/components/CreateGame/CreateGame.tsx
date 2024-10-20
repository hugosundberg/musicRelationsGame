import DynamicSearch from "../DynamicSearch/DynamicSearch";
import "./CreateGame.css";

const CreateGame = ({
  isVisible,
  accessToken,
  handleSetStartArtist,
  handleSetTargetArtist,
  closeCreateGame,
  startNewGame,
}: any) => {
  if (isVisible) {
    return (
      <>
        <div className="overlay" onClick={closeCreateGame}></div>
        <div className="create-game-component">
          <div className="create-game-header">
            <h3>Select artists</h3>
            <button className="close-button" onClick={closeCreateGame}>
              <i className="bi bi-x-circle-fill"></i>
            </button>
          </div>
          <DynamicSearch
            header={"Starting artist"}
            accessToken={accessToken}
            handleSetStartArtist={handleSetStartArtist}
          />

          <DynamicSearch
            header={"Target artist"}
            accessToken={accessToken}
            handleSetTargetArtist={handleSetTargetArtist}
          />

          <button onClick={startNewGame} className="play-button">
            Play <i className="bi bi-play"></i>
          </button>
        </div>
      </>
    );
  }
};

export default CreateGame;
