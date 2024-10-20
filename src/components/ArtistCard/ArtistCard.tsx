import "./ArtistCard.css";

interface ArtistProps {
  name: string;
  img: string;
  id: string;
  handleSetCurrentArtist: (id: string) => void; // Properly type the function prop
}

const ArtistCard: React.FC<ArtistProps> = ({
  name,
  img,
  id,
  handleSetCurrentArtist,
}) => {
  return (
    <div
      className="artist-card"
      onClick={() => {
        handleSetCurrentArtist(id); // Pass the artist ID when the card is clicked
      }}
    >
      <h2>{name}</h2>
      <div className="image-container">
        {img && <img src={img} alt={name} />}
      </div>
    </div>
  );
};

export default ArtistCard;
