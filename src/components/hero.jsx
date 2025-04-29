import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Import arrow icons

export default function Hero() {
  const [movies, setMovies] = useState([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [fade, setFade] = useState(false);

  async function getMovies() {
    const apiKey = import.meta.env.VITE_API_TMDB;
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      setMovies(json.results);
    } catch (error) {
      console.error(error.message);
    }
  }

  const goToPreviousMovie = () => {
    setCurrentMovieIndex(
      (prevIndex) => (prevIndex - 1 + movies.length) % movies.length
    );
  };

  const goToNextMovie = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 500);
  };

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      const intervalId = setInterval(() => {
        goToNextMovie();
      }, 8000);

      return () => clearInterval(intervalId);
    }
  }, [movies]);

  useEffect(() => {
    if (!fade) return;
    setTimeout(() => {
      setFade(false);
    }, 100);
  }, [currentMovieIndex]);

  return (
    <div className="dark:bg-slate-800">
      <div className="relative isolate overflow-hidden bg-gray-900 h-screen flex items-center justify-start px-4 sm:px-8">
        {/* Slideshow Background */}
        {movies.length > 0 && (
          <div className="absolute inset-0 -z-10 w-full h-full">
            <img
              alt="background"
              src={`https://image.tmdb.org/t/p/w1280${movies[currentMovieIndex].backdrop_path}`}
              className={`w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                fade ? "opacity-0" : "opacity-100"
              }`}
              style={{
                filter: "brightness(0.9)",
              }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          </div>
        )}

        {/* Arrows */}
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
          <button
            onClick={goToPreviousMovie}
            className="p-2 bg-gray-500 text-white rounded-full hover:bg-gray-700 transition ease-in-out"
          >
            <FaChevronLeft size={18} />
          </button>
        </div>

        <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
          <button
            onClick={goToNextMovie}
            className="p-2 bg-gray-500 text-white rounded-full hover:bg-gray-700 transition ease-in-out"
          >
            <FaChevronRight size={18} />
          </button>
        </div>

        {/* Movie Card */}
        {movies.length > 0 && (
          <div className="max-w-full text-white z-10 relative flex flex-col sm:flex-row items-center mx-20">
            <div className="w-full sm:w-full max-w-xs sm:max-w-sm rounded overflow-hidden">
              <img
                className="w-full sm:px-10 object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/w500${movies[currentMovieIndex].poster_path}`}
                alt={movies[currentMovieIndex].original_title}
              />
            </div>
            <div className="py-4 text-center sm:text-left">
              <div className="font-bold text-2xl sm:text-3xl text-white">
                {movies[currentMovieIndex].original_title}
              </div>
              {movies[currentMovieIndex].tagline ? (
                <p className="text-sm text-gray-200 mt-2">
                  {movies[currentMovieIndex].tagline}
                </p>
              ) : (
                <p className="text-sm text-gray-400 mt-2">
                  No tagline available
                </p>
              )}
              <p className="text-sm text-gray-200 mt-2">
                {movies[currentMovieIndex].release_date}
              </p>
              <p className="text-sm mt-2 text-gray-200">
                Rating:{" "}
                <span className="text-yellow-400">
                  {movies[currentMovieIndex].vote_average}⭐
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
