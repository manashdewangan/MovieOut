import { useEffect, useState } from "react";

export default function Upcoming() {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [hoveredMovieId, setHoveredMovieId] = useState(null);

  async function fetchUpcomingMovies() {
    const apiKey = import.meta.env.VITE_API_TMDB;
    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&include_adult=false`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      setUpcomingMovies(json.results);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    fetchUpcomingMovies();
  }, []);

  return (
    <div className="relative w-full bg-black mt-10">
      <div className="px-4 sm:px-6 lg:px-24">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white uppercase">
            Upcoming Movies
          </h2>
          <div className="bg-red-600 w-20 sm:w-28 h-1 sm:h-2 mt-2"></div>
        </div>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {upcomingMovies.map((movie) => (
            <div
              key={movie.id}
              className="overflow-hidden bg-black rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300"
              onMouseEnter={() => setHoveredMovieId(movie.id)}
              onMouseLeave={() => setHoveredMovieId(null)}
            >
              <div className="relative">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "https://via.placeholder.com/500x750?text=No+Image"
                  }
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />

                {hoveredMovieId === movie.id && (
                  <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex flex-col justify-end p-4 text-white transition-all duration-300">
                    <p className="text-xs sm:text-sm text-gray-300 mb-1">
                      To be released on:{" "}
                      <span className="text-gray-400">
                        {movie.release_date || "N/A"}
                      </span>
                    </p>
                    <h3 className="text-sm sm:text-lg font-semibold mb-1">
                      {movie.title.length > 25
                        ? movie.title.slice(0, 25) + "..."
                        : movie.title}
                    </h3>
                    <p className="text-xs text-gray-400 mb-2 line-clamp-3">
                      {movie.overview
                        ? movie.overview
                        : "No description available."}
                    </p>
                    <p className="text-xs sm:text-sm">
                      Language:{" "}
                      <span className="text-gray-400">
                        {movie.original_language?.toUpperCase() || "N/A"}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
