import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SeriesCard = () => {
  const [hoveredSeriesId, setHoveredSeriesId] = useState(null);
  const [series, setSeries] = useState([]);

  async function getSeries() {
    const apiKey = import.meta.env.VITE_API_TMDB;
    const url = `https://api.themoviedb.org/3/trending/tv/day?api_key=${apiKey}&include_adult=false`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      setSeries(json.results);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getSeries();
  }, []);
  return (
    <>
      {series.map((tvSeries) => (
        <Link to={`/series/${tvSeries.id}`} key={tvSeries.id}>
          <div
            className="overflow-hidden bg-black rounded-lg shadow-md hover:shadow-lg transition duration-300"
            onMouseEnter={() => setHoveredSeriesId(tvSeries.id)}
            onMouseLeave={() => setHoveredSeriesId(null)}
          >
            <div className="relative">
              <img
                src={`https://image.tmdb.org/t/p/w500${tvSeries.poster_path}`}
                alt={tvSeries.name}
                className="w-full h-full object-cover"
              />

              {hoveredSeriesId === tvSeries.id && (
                <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex flex-col justify-end p-4 text-white transition-all duration-300">
                  <p className="text-xs sm:text-sm text-gray-300 mb-1">
                    First Air Date:{" "}
                    <span className="text-gray-400">
                      {tvSeries.first_air_date || "N/A"}
                    </span>
                  </p>
                  <h3 className="text-sm sm:text-lg font-semibold mb-1">
                    {tvSeries.name.length > 25
                      ? tvSeries.name.slice(0, 25) + "..."
                      : tvSeries.name}
                  </h3>
                  <p className="text-xs text-gray-400 mb-2 line-clamp-3">
                    {tvSeries.overview || "No overview available."}
                  </p>
                  <p className="text-xs sm:text-sm">
                    Language:{" "}
                    <span className="text-gray-400">
                      {tvSeries.original_language.toUpperCase()}
                    </span>
                  </p>
                  <p className="text-xs sm:text-sm mt-1">
                    Rating:{" "}
                    <span className="text-yellow-400">
                      {tvSeries.vote_average || "N/A"}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default SeriesCard;
