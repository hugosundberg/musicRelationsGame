import { useEffect, useState } from "react";
import Artist from "./components/Artist";
import spotifyAPI from "./services/spotifyAPI";
import "./App.css";

interface ArtistType {
  name: string;
  img: string;
}

const App = () => {
  const [accessToken, setAccessToken] = useState<string>("");
  const [relatedArtists, setRelatedArtists] = useState<ArtistType[]>([]);

  const artistID = "0TnOYISbd1XYRBk9myaseg"; // Example artist ID (Pitbull)

  // Fetch Access Token when the component is mounted
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await spotifyAPI.fetchAccessToken(); // Corrected to fetch the access token
        setAccessToken(token);
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };

    fetchToken();
  }, []);

  // Fetch Related Artists
  const fetchRelatedArtists = async () => {
    if (!accessToken) {
      console.log("Access token not available yet.");
      return;
    }

    try {
      const artists = await spotifyAPI.fetchRelatedArtists(
        artistID,
        accessToken
      );
      setRelatedArtists(artists);
    } catch (error) {
      console.error("Error fetching related artists:", error);
    }
  };

  return (
    <>
      <div className="nav-bar">
        <h3>Music Relations</h3>
      </div>
      <div className="game-body">
        <h1>Music Relations Game</h1>
        <button onClick={fetchRelatedArtists}>Fetch Related Artists</button>
        <div className="artist-list">
          {relatedArtists.length > 0 ? (
            relatedArtists.map((artist, index) => (
              <Artist key={index} name={artist.name} img={artist.img} />
            ))
          ) : (
            <p>No related artists yet. Click the button to fetch.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
