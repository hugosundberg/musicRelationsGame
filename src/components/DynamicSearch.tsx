import React, { useState, useEffect } from "react";
import spotifyAPI from "../services/spotifyAPI";
import "./DynamicSearch.css";

interface Artist {
  name: string;
  img: string;
  id: string;
}

const Search = ({ accessToken, setSelectedArtist }: any) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Artist[]>([]); // Initialize as an empty array
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Fetch data from Spotify when searchQuery or accessToken changes
  useEffect(() => {
    const fetchData = async () => {
      if (!searchQuery) {
        setSearchResults([]); // Clear results if search query is empty
        return;
      }

      setLoading(true);
      try {
        const artists = await spotifyAPI.handleSearch(searchQuery, accessToken);
        setSearchResults(artists || []); // Handle cases where artists.items is undefined
        setLoading(false);
      } catch (error) {
        setError("Error fetching data. Please try again.");
        setLoading(false);
      }
    };

    // Debounce search input
    const debounceFetch = setTimeout(() => {
      fetchData();
    }, 500); // 500ms delay for debouncing

    // Cleanup timeout if the user types before the delay finishes
    return () => clearTimeout(debounceFetch);
  }, [searchQuery, accessToken]);

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query); // Update search query
  };

  return (
    <div className="search-component">
      <input
        className="input-field"
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearch}
      />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : Array.isArray(searchResults) && searchResults.length > 0 ? ( // Guard to check if searchResults is an array
        <ul>
          {searchResults.map((result) => (
            <li key={result.id}>
              <button
                onClick={() => {
                  setSelectedArtist(result.id);
                  setSearchResults([]);
                }}
              >
                {result.name}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default Search;
