import ArtistCard from "../ArtistCard/ArtistCard";
import "./ArtistList.css";

// Define the type for relatedArtists prop
interface ArtistType {
  name: string;
  id: string;
  img: string;
}

interface ArtistListProps {
  relatedArtists: ArtistType[];
  startArtist: string;
  handleSetCurrentArtist: (id: string) => void; // Properly type the function
}

const ArtistList = ({
  relatedArtists,
  startArtist,
  handleSetCurrentArtist,
}: ArtistListProps) => {
  if (!startArtist) return null; // Add a fallback for falsy startArtist

  return (
    <div className="artist-list">
      {relatedArtists.length > 0 ? (
        relatedArtists.map((artist) => (
          <ArtistCard
            key={artist.id}
            id={artist.id}
            name={artist.name}
            img={artist.img}
            handleSetCurrentArtist={() => handleSetCurrentArtist(artist.id)} // Pass as a reference
          />
        ))
      ) : (
        <p>No related artists found.</p> // Add a default message
      )}
    </div>
  );
};

export default ArtistList;
