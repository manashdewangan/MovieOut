import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [images, setImages] = useState({ backdrops: [], posters: [] });

  const apiKey = import.meta.env.VITE_API_TMDB;

  useEffect(() => {
    async function fetchDetails() {
      try {
        const [movieRes, creditsRes, reviewRes, recRes, imageRes] =
          await Promise.all([
            fetch(
              `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=videos`
            ),
            fetch(
              `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`
            ),
            fetch(
              `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${apiKey}`
            ),
            fetch(
              `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${apiKey}`
            ),
            fetch(
              `https://api.themoviedb.org/3/movie/${id}/images?api_key=${apiKey}`
            ),
          ]);

        const movieData = await movieRes.json();
        const castData = await creditsRes.json();
        const reviewData = await reviewRes.json();
        const recData = await recRes.json();
        const imageData = await imageRes.json();

        setMovie(movieData);
        setCast(castData.cast.slice(0, 6));
        setReviews(reviewData.results);
        setRecommendations(recData.results.slice(0, 6));
        setImages({
          backdrops: imageData.backdrops,
          posters: imageData.posters,
        });

        const trailers = movieData.videos.results.filter(
          (v) => v.type === "Trailer" && v.site === "YouTube"
        );
        setTrailer(trailers.length > 0 ? trailers[0].key : null);
      } catch (error) {
        console.error("Failed to load movie details", error);
      }
    }

    fetchDetails();
  }, [id]);

  if (!movie) {
    return (
      <div className="text-white bg-black flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="text-white bg-black min-h-screen px-4 md:px-10 lg:px-20 py-10 space-y-14">
      {/* Movie Header */}
      <div className="flex flex-col md:flex-row gap-10">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full max-w-[300px] rounded-xl shadow-lg mx-auto md:mx-0"
        />
        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">
            {movie.title}{" "}
            <span className="text-gray-400">
              ({movie.release_date?.slice(0, 4)})
            </span>
          </h1>
          <p className="text-gray-300 italic">{movie.tagline}</p>
          <p className="text-gray-400">
            {movie.genres?.map((g) => g.name).join(", ")}
          </p>
          <p className="text-gray-300">{movie.overview}</p>
          <ul className="text-sm text-gray-400 space-y-1 pt-4">
            <li>Status: {movie.status}</li>
            <li>Language: {movie.original_language?.toUpperCase()}</li>
            <li>Runtime: {movie.runtime} mins</li>
            <li>Budget: ${movie.budget?.toLocaleString()}</li>
            <li>Revenue: ${movie.revenue?.toLocaleString()}</li>
          </ul>
        </div>
      </div>

      {/* Trailer */}
      {trailer && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">🎬 Trailer</h2>
          <div className="aspect-video w-full rounded-lg overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${trailer}`}
              title="Movie Trailer"
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Cast */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">👥 Top Billed Cast</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {cast.map((actor) => (
            <div key={actor.id} className="flex-shrink-0 w-28 text-center">
              <img
                src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                alt={actor.name}
                className="rounded-lg h-36 object-cover mx-auto shadow-md"
              />
              <p className="text-sm mt-2 font-semibold">{actor.name}</p>
              <p className="text-xs text-gray-400">{actor.character}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">📝 Reviews</h2>
        {reviews.length > 0 ? (
          <div className="space-y-6">
            {reviews.map((r, idx) => (
              <div
                key={idx}
                className="bg-white text-black rounded-lg p-6 shadow-lg"
              >
                <h3 className="font-bold mb-2">✍️ {r.author}</h3>
                <p className="text-gray-800">{r.content.slice(0, 300)}...</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No reviews available</p>
        )}
      </div>

      {/* Media */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">🖼️ Media</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.backdrops.slice(0, 6).map((img, idx) => (
            <a
              key={idx}
              href={`https://image.tmdb.org/t/p/original${img.file_path}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={`https://image.tmdb.org/t/p/w780${img.file_path}`}
                alt="Backdrop"
                className="rounded-xl shadow-lg hover:scale-105 transition duration-300 ease-in-out"
              />
            </a>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">🎯 Recommendations</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {recommendations.map((rec) => (
            <Link
              key={rec.id}
              to={`/movie/${rec.id}`}
              className="flex-shrink-0 w-32 hover:scale-105 transition"
            >
              <img
                src={`https://image.tmdb.org/t/p/w200${rec.poster_path}`}
                alt={rec.title}
                className="rounded-lg shadow-md"
              />
              <p className="text-xs mt-2 text-white text-center">{rec.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
