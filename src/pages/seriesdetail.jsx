import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function SeriesDetail() {
  const { id } = useParams();
  const [series, setSeries] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [media, setMedia] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const apiKey = import.meta.env.VITE_API_TMDB;

  useEffect(() => {
    async function fetchData() {
      try {
        const resSeries = await fetch(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&append_to_response=videos,images,recommendations,reviews,credits`
        );
        const data = await resSeries.json();
        setSeries(data);
        setTrailer(data.videos?.results.find((v) => v.type === "Trailer"));
        setCast(data.credits?.cast.slice(0, 6));
        setReviews(data.reviews?.results);
        setMedia(data.images?.backdrops.slice(0, 5));
        setRecommendations(data.recommendations?.results.slice(0, 6));
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [id]);

  if (!series) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-black text-white px-4 sm:px-8 md:px-16 lg:px-32 pt-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-8">
        <img
          className="w-full max-w-[300px] rounded-xl shadow-lg mx-auto md:mx-0"
          src={
            series.poster_path
              ? `https://image.tmdb.org/t/p/w500${series.poster_path}`
              : "https://via.placeholder.com/500x750?text=No+Poster"
          }
          alt={series.name}
        />
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl sm:text-4xl font-bold">
            {series.name}{" "}
            <span className="text-gray-400 text-lg">
              ({series.first_air_date?.split("-")[0]})
            </span>
          </h1>
          {series.tagline && (
            <p className="italic text-gray-400 mt-2">{series.tagline}</p>
          )}
          <p className="mt-4 text-gray-300">
            {series.overview || "No overview available."}
          </p>
          <div className="mt-4 text-sm text-gray-400 space-y-1">
            <p>
              <strong>Status:</strong> {series.status}
            </p>
            <p>
              <strong>Language:</strong>{" "}
              {series.original_language?.toUpperCase()}
            </p>
            <p>
              <strong>Seasons:</strong> {series.number_of_seasons}
            </p>
            <p>
              <strong>Episodes:</strong> {series.number_of_episodes}
            </p>
          </div>
        </div>
      </div>

      {/* Trailer */}
      {trailer && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Trailer</h2>
          <div className="relative w-full overflow-hidden rounded-lg aspect-video">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title="Series Trailer"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* Cast */}
      {cast.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Top Billed Cast</h2>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
            {cast.map((actor) => (
              <div
                key={actor.id}
                className="flex-shrink-0 w-28 sm:w-32 text-center"
              >
                <img
                  className="w-full h-40 object-cover rounded-lg shadow"
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                      : "https://via.placeholder.com/185x278?text=No+Image"
                  }
                  alt={actor.name}
                />
                <p className="mt-2 text-sm font-semibold">{actor.name}</p>
                <p className="text-xs text-gray-400">{actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reviews */}
      {reviews.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Reviews</h2>
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-white text-black p-4 rounded-lg shadow transition hover:scale-[1.02]"
              >
                <h3 className="font-bold mb-2">🔥 {review.author}</h3>
                <p className="text-sm">{review.content.slice(0, 400)}...</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Media */}
      {media.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Media</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {media.map((img, idx) => (
              <a
                key={idx}
                href={`https://image.tmdb.org/t/p/original${img.file_path}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${img.file_path}`}
                  alt="Media Still"
                  className="rounded-xl shadow-lg hover:scale-105 transition duration-300 ease-in-out"
                />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Recommendations</h2>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
            {recommendations.map((rec) => (
              <Link
                to={`/series/${rec.id}`}
                key={rec.id}
                className="flex-shrink-0 w-28 sm:w-36 hover:scale-105 transition"
              >
                <img
                  src={
                    rec.poster_path
                      ? `https://image.tmdb.org/t/p/w185${rec.poster_path}`
                      : "https://via.placeholder.com/185x278?text=No+Poster"
                  }
                  alt={rec.name}
                  className="w-full h-40 object-cover rounded-lg shadow"
                />
                <p className="text-xs sm:text-sm mt-2">{rec.name}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
