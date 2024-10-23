import { useEffect, useState } from "react";
import ArtistList from "./components/ArtistList/ArtistList";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Error from "./components/Error/Error";
import spotifyAPI from "./services/spotifyAPI";
import GameHeader from "./components/GameHeader/GameHeader";
import CurrentArtist from "./components/CurrentArtist/CurrentArtist";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import CreateGame from "./components/CreateGame/CreateGame";
import GameOver from "./components/GameOver/GameOver";
import Info from "./components/Info/Info";
import StartScreen from "./components/StartScreen/StartScreen";

interface Artist {
  name: string;
  id: string;
  img: string;
}

const App = () => {
  // API states
  const [accessToken, setAccessToken] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Error state
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Guess state
  const [guesses, setGuesses] = useState(0);

  // Artist states
  const [startArtist, setStartArtist] = useState<Artist>();
  const [targetArtist, setTargetArtist] = useState<Artist>();
  const [currentArtist, setCurrentArtist] = useState<Artist>();
  const [relatedArtists, setRelatedArtists] = useState<Artist[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);

  // Visibility states
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [isCreateGameVisible, setIsCreateGameVisible] = useState(false);
  const [isGameOverVisible, setIsGameOverVisible] = useState(false);
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [isGameHeaderVisible, setIsGameHeaderVisible] = useState(false);
  const [isStartScreenVisible, setIsStartScreenVisible] = useState(true);

  const handleSetStartArtist = (artist: Artist) => {
    setStartArtist(artist);
  };

  const handleSetTargetArtist = (artist: Artist) => {
    setTargetArtist(artist);
  };

  const handleSetCurrentArtist = (artist: Artist) => {
    if (targetArtist && artist.id === targetArtist.id) {
      setIsGameOver(true);
      setIsGameOverVisible(true);
      setGuesses(guesses + 1);
    } else {
      setCurrentArtist(artist);
      fetchRelatedArtists(artist.id);
      setGuesses(guesses + 1);
    }
  };

  const closeInfo = () => {
    setIsInfoVisible(false);
  };

  const closeStartScreen = () => {
    showCreateGame();
    setIsStartScreenVisible(false);
  };

  const showInfo = () => {
    setIsInfoVisible(true);
  };

  const closeError = () => {
    setIsErrorVisible(false);
  };

  const showCreateGame = () => {
    setIsCreateGameVisible(true);
  };

  const closeCreateGame = () => {
    setIsCreateGameVisible(false);
  };

  const closeGameOver = () => {
    setIsGameOverVisible(false);
  };

  const startNewGame = () => {
    if (startArtist && targetArtist) {
      setIsGameHeaderVisible(true);
      setGuesses(0);
      fetchRelatedArtists(startArtist.id);
      setIsCreateGameVisible(false);
    }
  };
  <a href=""></a>;
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

  // Fetch Related Artists using startArtist
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
      <NavigationBar showCreateGame={showCreateGame} showInfo={showInfo} />
      <div className="game-body">
        <StartScreen
          isVisible={isStartScreenVisible}
          onClick={closeStartScreen}
        />
        <GameHeader
          isVisible={isGameHeaderVisible}
          startArtist={startArtist}
          targetArtist={targetArtist}
          guesses={guesses}
        />
        <CurrentArtist currentArtist={currentArtist} />
        <CreateGame
          isVisible={isCreateGameVisible}
          closeCreateGame={closeCreateGame}
          accessToken={accessToken}
          handleSetStartArtist={handleSetStartArtist}
          handleSetTargetArtist={handleSetTargetArtist}
          startNewGame={startNewGame}
        />
        <Info isVisible={isInfoVisible} closeInfo={closeInfo} />
        <GameOver
          isVisible={isGameOverVisible}
          closeGameOver={closeGameOver}
          startArtist={startArtist}
          targetArtist={targetArtist}
          guesses={guesses}
        />
        <Error
          message={errorMessage}
          isErrorVisible={isErrorVisible}
          closeError={closeError}
        />
        {startArtist && (
          <ArtistList
            isGameOver={isGameOver}
            relatedArtists={relatedArtists}
            startArtist={startArtist.id}
            handleSetCurrentArtist={handleSetCurrentArtist}
          />
        )}
      </div>
    </>
  );
};

export default App;
