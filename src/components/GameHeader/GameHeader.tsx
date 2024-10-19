const GameHeader = ({ startArtist, targetArtist }: any) => {
  return (
    <div className="start-target-div">
      <h4>Use related artists to go from</h4>
      <div className="start-target-artist">
        <img src="" alt="" />
        <h4>{startArtist}</h4>
      </div>

      <div className="start-target-artist">
        <img src="" alt="" />
        <h4>{targetArtist}</h4>
      </div>
    </div>
  );
};

export default GameHeader;
