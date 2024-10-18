import DynamicSearch from "./DynamicSearch";
import "./CreateGame.css";

const CreateGame = ({
  accessToken,
  setCurrentArtist,
  closeCreateGame,
}: any) => {
  return (
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
        setSelectedArtist={setCurrentArtist}
      />

      <DynamicSearch
        header={"Target artist"}
        accessToken={accessToken}
        setSelectedArtist={setCurrentArtist}
      />

      <button className="play-button">
        Play <i className="bi bi-play"></i>
      </button>
    </div>
  );
};

export default CreateGame;
