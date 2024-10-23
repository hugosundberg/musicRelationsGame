import ArtistCard from "../ArtistCard/ArtistCard";
import "./ArtistList.css";

// Define the type for relatedArtists prop
interface ArtistType {
  name: string;
  id: string;
  img: string;
}

interface ArtistListProps {
  isGameOver: boolean;
  relatedArtists: ArtistType[];
  startArtist: string;
  handleSetCurrentArtist: (artist: ArtistType) => void; // Properly type the function
}

const ArtistList = ({
  relatedArtists,
  startArtist,
  isGameOver,
  handleSetCurrentArtist,
}: ArtistListProps) => {
  if (!startArtist) return null; // Add a fallback for falsy startArtist
  if (isGameOver) return null;

  return (
    <div className="artist-list">
      {relatedArtists.length > 0
        ? relatedArtists.map((artist) => (
            <ArtistCard
              key={artist.id}
              id={artist.id}
              name={artist.name}
              img={artist.img}
              handleSetCurrentArtist={() => handleSetCurrentArtist(artist)} // Pass as a reference
            />
          ))
        : ""}
    </div>
  );
};

export default ArtistList;
