import { useEffect, useState } from "react";
import ArtistList from "./components/ArtistList";
import NavigationBar from "./components/NavigationBar";
import Error from "./components/error";
import spotifyAPI from "./services/spotifyAPI";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

interface ArtistType {
  name: string;
  img: string;
}

const App = () => {
  const [accessToken, setAccessToken] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isErrorVisable, setIsErrorVisable] = useState(false);
  const [relatedArtists, setRelatedArtists] = useState<ArtistType[]>([]);

  const [currentArtist, setCurrentArtist] = useState("");

  const artistID = "0TnOYISbd1XYRBk9myaseg"; // Example artist ID (Pitbull)

  const closeError = () => {
    setIsErrorVisable(false);
  };

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
      setErrorMessage(
        "There was an error fetching related artists. Please try again later."
      );
      setIsErrorVisable(true);
    }
  };

  const handleSearch = async () => {
    try {
      const artist = await spotifyAPI.handleSearch("Taylor Swift", accessToken);
    } catch (error) {
      console.error("Error searching", error);
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="game-body">
        <h1>Music Relations Game</h1>
        <Error
          message={errorMessage}
          isErrorVisable={isErrorVisable}
          closeError={closeError}
        />
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Recipient's username"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            onClick={handleSearch}
          >
            Button
          </button>
        </div>

        <button onClick={fetchRelatedArtists}>Fetch Related Artists</button>
        <ArtistList relatedArtists={relatedArtists} />
      </div>
    </>
  );
};

export default App;
