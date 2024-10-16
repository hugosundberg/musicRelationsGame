import "./ArtistCard.css";

interface ArtistProps {
  name: string;
  img: string;
}

const ArtistCard = ({ name, img }: ArtistProps) => {
  return (
    <>
      <div className="artist-card">
        <h2>{name}</h2>
        <div className="image-container">
          {img && <img src={img} alt={name} />}
        </div>
      </div>
    </>
  );
};

export default ArtistCard;
