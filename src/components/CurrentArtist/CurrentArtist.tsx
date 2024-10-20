import "./CurrentArtist.css";

interface Artist {
  name: string;
  id: string;
  img: string;
}

interface ArtistProps {
  currentArtist?: Artist;
}

const CurrentArtist = ({ currentArtist }: ArtistProps) => {
  if (!currentArtist) {
    return ""; // Fallback for undefined currentArtist
  }

  return (
    <div className="current-artist">
      <img
        src={currentArtist.img || ""} // Fallback image if img is missing
        alt={currentArtist.name || "Unknown Artist"}
      />
      <p>
        <strong>{currentArtist.name}</strong>
      </p>
      <p>related Artists</p>
    </div>
  );
};

export default CurrentArtist;
