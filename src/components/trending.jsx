import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Trending() {
  const [trendMovies, setTrendMovies] = useState([]);
  const [hoveredMovieId, setHoveredMovieId] = useState(null);

  async function trendingMovies() {
    const apiKey = import.meta.env.VITE_API_TMDB;
    const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&include_adult=false`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      setTrendMovies(json.results);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    trendingMovies();
  }, []);

  return (
    <div className="relative w-full mt-10 bg-black">
      <div className="px-4 sm:px-6 lg:px-24">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white uppercase">
            Trending Movies
          </h2>
          <div className="bg-red-600 w-20 sm:w-28 h-1 sm:h-2 mt-2"></div>
        </div>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {trendMovies.map((movie) => (
            <Link to={`/movie/${movie.id}`} key={movie.id}>
              <div
                className="overflow-hidden bg-black rounded-lg shadow-md hover:shadow-lg transition duration-300"
                onMouseEnter={() => setHoveredMovieId(movie.id)}
                onMouseLeave={() => setHoveredMovieId(null)}
              >
                <div className="relative">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />

                  {hoveredMovieId === movie.id && (
                    <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex flex-col justify-end p-4 text-white transition-all duration-300">
                      <p className="text-xs sm:text-sm text-gray-300 mb-1">
                        Released:{" "}
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
                        {movie.overview || "No overview available."}
                      </p>
                      <p className="text-xs sm:text-sm">
                        Language:{" "}
                        <span className="text-gray-400">
                          {movie.original_language.toUpperCase()}
                        </span>
                      </p>
                      <p className="text-xs sm:text-sm mt-1">
                        Rating:{" "}
                        <span className="text-yellow-400">
                          {movie.vote_average || "N/A"}
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
