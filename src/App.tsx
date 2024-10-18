import { useEffect, useState } from "react";
import ArtistList from "./components/ArtistList";
import NavigationBar from "./components/NavigationBar";
import Error from "./components/Error";
import spotifyAPI from "./services/spotifyAPI";
import DynamicSearch from "./components/DynamicSearch";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import CreateGame from "./components/CreateGame";

interface ArtistType {
  name: string;
  img: string;
}

const App = () => {
  const [accessToken, setAccessToken] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [relatedArtists, setRelatedArtists] = useState<ArtistType[]>([]);
  const [currentArtist, setCurrentArtist] = useState<string>("");

  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [isCreateGameVisible, setIsCreateGameVisible] = useState(false);

  const closeError = () => {
    setIsErrorVisible(false);
  };

  const showCreateGame = () => {
    setIsCreateGameVisible(true);
  };

  const closeCreateGame = () => {
    setIsCreateGameVisible(false);
  };

  // Fetch Access Token when the component is mounted
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await spotifyAPI.fetchAccessToken();
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
  const fetchRelatedArtists = async (artistID: string) => {
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
      await spotifyAPI.handleSearch(searchQuery, accessToken);
    } catch (error) {
      console.error("Error searching artist:", error);
      setErrorMessage("Error occurred during the search. Please try again.");
      setIsErrorVisible(true);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch(); // Trigger search on Enter key press
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchQuery, accessToken]);

  return (
    <>
      <NavigationBar showCreateGame={showCreateGame} />
      <div className="game-body">
        <CreateGame
          isVisible={isCreateGameVisible}
          closeCreateGame={closeCreateGame}
        />
        <Error
          message={errorMessage}
          isErrorVisible={isErrorVisible}
          closeError={closeError}
        />
        <ArtistList
          relatedArtists={relatedArtists}
          currentArtist={currentArtist}
        />
        {currentArtist}
      </div>
    </>
  );
};

export default App;
