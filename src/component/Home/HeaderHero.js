import React, { useState, useEffect } from "react";
import SongService from "../../services/SongService"; // Import your SongService
import "./HeaderHero.css";
export default function HeaderHero() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (event) => {
    setSearchTerm(event.target.value);
    if (searchTerm.length > 0) {
      // Fetch songs only if the search term has at least one character
      const results = await fetchSongs(searchTerm);
      setSearchResults(results);
    } else {
      setSearchResults([]); // Clear results if search term is empty
    }
  };

  const fetchSongs = async (query) => {
    try {
      const response = await SongService.getAll();
      const data = await response;

      // Filter songs based on the search term (case-insensitive)
      const filteredResults = data.filter((song) =>
        song.name.toLowerCase().includes(query.toLowerCase())
      );

      return filteredResults;
    } catch (error) {
      console.error("Error fetching songs:", error);
      return [];
    }
  };

  return (
    <header className="hero">
      {/* <!-- TITLE HEADER --> */}
      <h1>
        An unparalleled experience of <br /> sound magic, Inspied Melody
      </h1>

      {/* <!-- FORM: SEARCH --> */}
      <form onSubmit={(e) => e.preventDefault()}>
        <span className="far fa-search"></span>
        <input
          type="search"
          placeholder="Search for music"
          aria-placeholder="Search for music"
          value={searchTerm}
          onChange={handleSearch}
        />

        {/* <!-- SEARCH RESULTS --> */}
        <ul>
          {searchResults.map((song) => (
            <li key={song.id}>
              <img src={song.imageUrl} alt={song.name} />
              <div>
                <h3>{song.name}</h3>
                <p>{song.artist}</p>
              </div>
            </li>
          ))}
        </ul>
      </form>

      {/* <!-- IMAGE SUORCE --> */}
      <p>
        Free image by{" "}
        <a href="https://pixabay.com/photos/concert-microphone-bandstand-music-7424190/">
          HubertPhotographer
        </a>
      </p>
    </header>
  );
}