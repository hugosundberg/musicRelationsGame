import ArtistCard from "./ArtistCard";
import "./ArtistList.css";

// Define the type for relatedArtists prop
interface ArtistType {
  name: string;
  img: string;
}

interface ArtistListProps {
  relatedArtists: ArtistType[];
}

const ArtistList = ({ relatedArtists }: ArtistListProps) => {
  return (
    <div className="artist-list">
      {relatedArtists.length > 0 ? (
        relatedArtists.map((artist, index) => (
          <ArtistCard key={index} name={artist.name} img={artist.img} />
        ))
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default ArtistList;
