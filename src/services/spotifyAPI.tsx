const BASE_URL = "https://api.spotify.com/v1";
const CLIENT_ID = "e1eebe4956964238811ab09bbe1f57d2";
const CLIENT_SECRET = "e800e3cc91c84163baa2b4d43e0f84bf";

interface Artist {
  name: string;
  img: string;
  id: string;
}

// Fetch the access token from Spotify
const fetchAccessToken = async (): Promise<string> => {
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

    return data.access_token;
  } catch (error) {
    throw new Error("Failed to fetch access token");
  }
};

// Handle artist search
const handleSearch = async (
  searchQuery: string,
  accessToken: string
): Promise<Artist[]> => {
  const authParameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const response = await fetch(
      `${BASE_URL}/search?q=${encodeURIComponent(
        searchQuery
      )}&type=artist&limit=10&offset=0`,
      authParameters
    );
    const data = await response.json();

    console.log(data);

    const artistsData = data.artists.items;

    // Safely map over the artists data to return the structured array
    const artists: Artist[] = artistsData.map((artist: any) => ({
      name: artist.name,
      img: artist.images && artist.images[0] ? artist.images[0].url : "", // Safely handle images
      id: artist.id,
    }));

    return artists;
  } catch (error) {
    console.error("Error fetching artist", error);
    throw new Error("Failed to fetch artists");
  }
};

// Fetch related artists using the access token
const fetchRelatedArtists = async (artistID: string, accessToken: string) => {
  const authParameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const response = await fetch(
      `${BASE_URL}/artists/${artistID}/related-artists`,
      authParameters
    );
    const data = await response.json();

    // Extract relevant information for each artist
    return data.artists.map((artist: any) => ({
      name: artist.name,
      img: artist.images && artist.images[0] ? artist.images[0].url : "",
      id: artist.id,
    }));
  } catch (error) {
    throw new Error("Failed to fetch related artists");
  }
};

export default {
  fetchAccessToken,
  fetchRelatedArtists,
  handleSearch,
};
