import DynamicSearch from "./DynamicSearch";
import "./CreateGame.css";

const CreateGame = ({ accessToken, setCurrentArtist }: any) => {
  return (
    <div className="create-game-component">
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
    </div>
  );
};

export default CreateGame;
