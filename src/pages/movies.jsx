import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiX } from "react-icons/fi";

const Movies = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [searchPage, setSearchPage] = useState(1);
  const [hoveredMovieId, setHoveredMovieId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const apiKey = import.meta.env.VITE_API_TMDB;

  // Fetch Popular Movies
  const fetchPopularMovies = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${pageNumber}`
      );
      const data = await response.json();
      if (response.ok) {
        setPopularMovies((prev) => [...prev, ...data.results]);
      } else {
        console.error("Error fetching popular movies:", data);
      }
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  // Handle search submit
  const handleSearchSubmit = async () => {
    if (searchQuery.trim() === "") return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          searchQuery
        )}&page=1&include_adult=false&api_key=${apiKey}`
      );
      const data = await response.json();
      if (response.ok) {
        setSearchResults(data.results);
        setHasSearched(true);
        setSearchPage(1);
      } else {
        console.error("Error searching movies:", data);
      }
    } catch (error) {
      console.error("Error searching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search "Browse More"
  const handleSearchBrowseMore = async () => {
    const nextPage = searchPage + 1;
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          searchQuery
        )}&page=${nextPage}&include_adult=false&api_key=${apiKey}`
      );
      const data = await response.json();
      if (response.ok) {
        setSearchResults((prev) => [...prev, ...data.results]);
        setSearchPage(nextPage);
      } else {
        console.error("Error loading more search results:", data);
      }
    } catch (error) {
      console.error("Error loading more search results:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBrowseMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPopularMovies(nextPage);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") handleSearchSubmit();
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setHasSearched(false);
  };

  const moviesToDisplay = hasSearched ? searchResults : popularMovies;

  return (
    <div className="dark:bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div>
            <h2 className="text-3xl font-bold uppercase tracking-wide">
              Movies
            </h2>
            <div className="bg-red-600 w-20 h-1 mt-2 rounded"></div>
          </div>

          {/* Search */}
          <div className="flex flex-1 md:justify-end gap-2">
            <div className="relative w-full md:w-80">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Search Movies..."
                className={`w-full py-2 pl-4 pr-10 rounded-md text-white bg-gray-800 border ${
                  isFocused ? "border-red-500" : "border-gray-600"
                } focus:outline-none`}
              />
              <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                {searchQuery ? (
                  <FiX
                    className="text-white cursor-pointer"
                    onClick={handleClearSearch}
                  />
                ) : (
                  <FiSearch
                    onClick={handleSearchSubmit}
                    className={`cursor-pointer ${
                      isFocused ? "text-red-500" : "text-gray-400"
                    }`}
                  />
                )}
              </div>
            </div>
            <button
              onClick={handleSearchSubmit}
              className="hidden md:inline-block px-6 py-2 bg-white text-black font-semibold rounded hover:bg-red-600 hover:text-white transition"
            >
              Search
            </button>
          </div>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-red-600"></div>
          </div>
        ) : (
          <>
            {moviesToDisplay.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {moviesToDisplay.map((movie) => (
                    <Link key={movie.id} to={`/movie/${movie.id}`}>
                      <div
                        className="relative bg-gray-900 rounded-lg overflow-hidden shadow-md transition transform hover:scale-105"
                        onMouseEnter={() => setHoveredMovieId(movie.id)}
                        onMouseLeave={() => setHoveredMovieId(null)}
                      >
                        <img
                          src={
                            movie.poster_path
                              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                              : "https://via.placeholder.com/500x750?text=No+Image"
                          }
                          alt={movie.title}
                          className="w-full h-72 object-cover"
                        />
                        {hoveredMovieId === movie.id && (
                          <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-end p-3 backdrop-blur-sm">
                            <h3 className="text-base font-bold">
                              {movie.title}
                            </h3>
                            <p className="text-xs text-gray-300">
                              {movie.overview?.slice(0, 80)}...
                            </p>
                            <div className="flex justify-between text-xs text-gray-400 mt-2">
                              <span>📅 {movie.release_date}</span>
                              <span>⭐ {movie.vote_average}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Browse More Button */}
                <div className="flex justify-center mt-12">
                  <button
                    onClick={
                      searchQuery ? handleSearchBrowseMore : handleBrowseMore
                    }
                    className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition"
                  >
                    Browse More
                  </button>
                </div>
              </>
            ) : hasSearched ? (
              <div className="text-center py-16">
                <h3 className="text-2xl font-bold mb-4">No Results Found</h3>
                <p className="text-gray-400">
                  Sorry, no movies match your search. Try another keyword.
                </p>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};

export default Movies;
