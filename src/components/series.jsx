import SeriesCard from "./seriesCard";

export default function Series() {
  return (
    <div className="relative w-full bg-black mt-10">
      <div className="px-4 sm:px-6 lg:px-24">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white uppercase">
            Popular Series
          </h2>
          <div className="bg-red-600 w-20 sm:w-28 h-1 sm:h-2 mt-2"></div>
        </div>
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          <SeriesCard />
        </div>
      </div>
    </div>
  );
}
