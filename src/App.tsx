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
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>(""); // Manage search query
  const [relatedArtists, setRelatedArtists] = useState<ArtistType[]>([]);
  const [currentArtist, setCurrentArtist] = useState<string>("");

  const closeError = () => {
    setIsErrorVisible(false);
  };

  // Fetch Access Token when the component is mounted
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await spotifyAPI.fetchAccessToken(); // Fetch the access token
        setAccessToken(token);
      } catch (error) {
        console.error("Error fetching access token:", error);
        setErrorMessage("Error fetching access token. Please try again later.");
        setIsErrorVisible(true);
      }
    };
    fetchToken();
  }, []);

  // Fetch Related Artists using currentArtist
  const fetchRelatedArtists = async () => {
    if (!accessToken) {
      console.log("Access token not available yet.");
      return;
    }

    if (!currentArtist) {
      console.log("No current artist selected yet.");
      return;
    }

    try {
      const artists = await spotifyAPI.fetchRelatedArtists(
        currentArtist,
        accessToken
      );
      setRelatedArtists(artists);
    } catch (error) {
      console.error("Error fetching related artists:", error);
      setErrorMessage(
        "There was an error fetching related artists. Please try again later."
      );
      setIsErrorVisible(true);
    }
  };

  // Handle artist search using the search query
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setErrorMessage("Please enter a search query.");
      setIsErrorVisible(true);
      return;
    }

    try {
      const artistID = await spotifyAPI.handleSearch(searchQuery, accessToken);
      setCurrentArtist(artistID); // Update current artist with the artist ID
      fetchRelatedArtists(); // Fetch related artists after setting the current artist
    } catch (error) {
      console.error("Error searching artist:", error);
      setErrorMessage("Error occurred during the search. Please try again.");
      setIsErrorVisible(true);
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="game-body">
        <h1>Music Relations Game</h1>
        <Error
          message={errorMessage}
          isErrorVisable={isErrorVisible}
          closeError={closeError}
        />

        {/* Input and Search Button */}
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search for an artist"
            aria-label="Search artist"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
          />
          <button
            className="btn btn-secondary"
            type="button"
            id="button-addon2"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        {/* Artist List (Related Artists) */}
        <ArtistList relatedArtists={relatedArtists} />
      </div>
    </>
  );
};

export default App;
