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
}

const ArtistList = ({ relatedArtists, startArtist }: ArtistListProps) => {
  if (startArtist) {
    return (
      <div className="artist-list">
        {relatedArtists.length > 0 ? (
          relatedArtists.map((artist) => (
            <ArtistCard key={artist.id} name={artist.name} img={artist.img} />
          ))
        ) : (
          <p></p>
        )}
      </div>
    );
  }
};

export default ArtistList;
