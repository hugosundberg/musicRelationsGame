import { useState, useEffect } from "react";
import spotifyAPI from "../services/spotifyAPI";

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Simulate fetching or filtering results dynamically
  useEffect(() => {
    if (searchQuery === "") {
      setSearchResults([]);
    } else {
      // Simulating a fetch or filter operation based on searchQuery
      const filteredResults = dummyData.filter((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredResults);
    }
  }, [searchQuery]);

  // Dummy data for demonstration purposes
  const dummyData = [
    "Apple",
    "Banana",
    "Orange",
    "Mango",
    "Grapes",
    "Pineapple",
    "Strawberry",
  ];

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
      />

      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((result, index) => (
            <li key={index}>{result}</li>
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default SearchComponent;
