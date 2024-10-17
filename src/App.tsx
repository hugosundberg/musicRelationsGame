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

  const artistID = "0TnOYISbd1XYRBk9myaseg"; // Example artist ID (Pitbull)

  const showError = () => {
    setIsErrorVisable(true);
  };

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
        <button onClick={fetchRelatedArtists}>Fetch Related Artists</button>
        <ArtistList relatedArtists={relatedArtists} />
      </div>
    </>
  );
};

export default App;
