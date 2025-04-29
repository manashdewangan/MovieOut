import React from "react";

const AboutUs = () => {
  return (
    <section className="bg-gray-900 text-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">About MovieOut</h1>
          <p className="text-lg text-gray-300">
            Welcome to MovieOut, your ultimate destination for discovering
            movies and TV shows! Whether you're looking for what's popular right
            now or the latest trending hits, MovieOut has got you covered.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300">
            <h2 className="text-2xl font-semibold mb-3 text-red-600">
              Popular Movies & TV Shows
            </h2>
            <p className="text-gray-400">
              Stay up-to-date with the most popular films and series across the
              globe. Get access to titles everyone’s talking about, whether
              they're blockbusters or hidden gems.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300">
            <h2 className="text-2xl font-semibold mb-3 text-red-600">
              Trending Titles
            </h2>
            <p className="text-gray-400">
              Find out what's trending in real-time. Our trending section keeps
              you updated with the newest and most buzz-worthy content, helping
              you stay in the loop on what’s hot right now.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300">
            <h2 className="text-2xl font-semibold mb-3 text-red-600">
              Powerful Search Engine
            </h2>
            <p className="text-gray-400">
              With our integration of the TMDB (The Movie Database) API, you can
              easily search for any movie or TV show, whether it's a
              fan-favorite classic or a new release. Detailed info such as cast,
              synopsis, and ratings are at your fingertips.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300">
            <h2 className="text-2xl font-semibold mb-3 text-red-600">
              Watchlists & Recommendations
            </h2>
            <p className="text-gray-400">
              (Coming Soon!) Create personalized watchlists and get curated
              recommendations based on your viewing habits.
            </p>
          </div>
        </div>

        {/* Why MovieOut Section */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-semibold mb-3 text-red-600">
            Why MovieOut?
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            In the age of endless streaming services, it can be overwhelming to
            know what to watch next. MovieOut simplifies the process by
            providing a one-stop platform for discovering and tracking the most
            popular and trending movies and shows.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
