import { useEffect, useState } from "react";
import "./App.css";

const BASE_URL = "https://api.spotify.com/v1"; // Corrected to include /v1

const CLIENT_ID = "e1eebe4956964238811ab09bbe1f57d2";
const CLIENT_SECRET = "e800e3cc91c84163baa2b4d43e0f84bf";

const App = () => {
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    // API Access Token
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
        setAccessToken(data.access_token); // Update the state with access token
      } catch (error) {
        console.error("Error fetching access token", error);
      }
    };

    fetchAccessToken();
  }, []);

  const fetchAlbum = async () => {
    if (!accessToken) {
      console.log("Access token not available yet.");
      return;
    }

    const authParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Correct usage of access token
      },
    };

    try {
      const response = await fetch(
        `${BASE_URL}/artists/0TnOYISbd1XYRBk9myaseg`,
        authParameters
      );
      const data = await response.json();
      console.log("Artist Data:", data); // Log the fetched data

      console.log("Artist name: " + data.name);
      console.log("Img src: " + data.images);
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
        <input type="text" />
        <button onClick={fetchAlbum}>Click me</button>
        <Artist />
      </div>
    </>
  );
};

function Artist() {
  return <div>Artist name: </div>;
}

export default App;
