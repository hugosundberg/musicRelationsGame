import { useEffect, useState } from "react";
import ArtistList from "./components/ArtistList";
import NavigationBar from "./components/NavigationBar";
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
      <NavigationBar />
      <div className="game-body">
        <h1>Music Relations Game</h1>
        <button onClick={fetchRelatedArtists}>Fetch Related Artists</button>
        <ArtistList relatedArtists={relatedArtists} />
      </div>
    </>
  );
};

export default App;
