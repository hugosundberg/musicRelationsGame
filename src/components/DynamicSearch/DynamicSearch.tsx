import React, { useState, useEffect } from "react";
import spotifyAPI from "../../services/spotifyAPI";
import "./DynamicSearch.css";

interface Artist {
  name: string;
  img: string;
  id: string;
}

const Search = ({
  accessToken,
  handleSetStartArtist,
  handleSetTargetArtist,
  header,
}: any) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Artist[]>([]); // Initialize as an empty array
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isArtistSelected, setIsArtistSelected] = useState<boolean>(false); // State to track if an artist is selected

  // Fetch data from Spotify when searchQuery or accessToken changes
  useEffect(() => {
    const fetchData = async () => {
      if (!searchQuery || isArtistSelected) {
        setSearchResults([]); // Clear results if search query is empty or an artist is selected
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
  }, [searchQuery, accessToken, isArtistSelected]);

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setIsArtistSelected(false);
  };

  return (
    <div className="search-component">
      <p>{header}</p>
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
      ) : searchQuery &&
        !isArtistSelected && // Prevent rendering results after selection
        Array.isArray(searchResults) &&
        searchResults.length > 0 ? (
        <ul>
          {searchResults.map((result) => (
            <li key={result.id}>
              <button
                className="button"
                onClick={() => {
                  if (header === "Starting artist") {
                    handleSetStartArtist(result);
                    setSearchQuery(result.name);
                    setIsArtistSelected(true);
                    setSearchResults([]);
                  } else if (header === "Target artist") {
                    handleSetTargetArtist(result);
                    setSearchQuery(result.name);
                    setIsArtistSelected(true);
                    setSearchResults([]);
                  }
                }}
              >
                {result.name}
              </button>
            </li>
          ))}
        </ul>
      ) : searchQuery &&
        !loading &&
        !searchResults.length &&
        !isArtistSelected ? (
        <p>No results found</p>
      ) : null}{" "}
      {/* Otherwise, display nothing */}
    </div>
  );
};

export default Search;
