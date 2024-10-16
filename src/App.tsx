import { useEffect, useState } from "react";
import "./App.css";

const BASE_URL = "https://api.spotify.com/v1";

const CLIENT_ID = "e1eebe4956964238811ab09bbe1f57d2";
const CLIENT_SECRET = "e800e3cc91c84163baa2b4d43e0f84bf";

interface ArtistProps {
  name: string;
  img: string;
}

const App = () => {
  const [accessToken, setAccessToken] = useState<string>("");
  const [currentArtist, setCurrentArtist] = useState<any>(null);

  useEffect(() => {
    const fetchAccessToken = async () => {
      const authParameters = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
        }),
      };

      try {
        const result = await fetch(
          "https://accounts.spotify.com/api/token",
          authParameters
        );
        const data = await result.json();
        setAccessToken(data.access_token);
      } catch (error) {
        console.error("Error fetching access token", error);
      }
    };

    fetchAccessToken();
  }, []);

  const fetchArtist = async () => {
    if (!accessToken) {
      console.log("Access token not available yet.");
      return;
    }

    const authParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const response = await fetch(
        `${BASE_URL}/artists/0TnOYISbd1XYRBk9myaseg`,
        authParameters
      );
      const data = await response.json();

      setCurrentArtist(data);
    } catch (error) {
      console.error("Error fetching artist data", error);
    }
  };

  return (
    <>
      <div className="nav-bar">
        <h3>Music Relations</h3>
      </div>
      <div className="game-body">
        <h1>Music Relations Game</h1>
        <button onClick={fetchArtist}>Fetch Artist</button>
        {currentArtist && (
          <Artist
            name={currentArtist.name}
            img={
              currentArtist.images && currentArtist.images[0]
                ? currentArtist.images[0].url
                : ""
            }
          />
        )}
      </div>
    </>
  );
};

function Artist({ name, img }: ArtistProps) {
  return (
    <>
      <div>Artist name: {name}</div>
      {img && (
        <div>
          <img src={img} alt={name} style={{ width: "200px" }} />
        </div>
      )}
    </>
  );
}

export default App;
