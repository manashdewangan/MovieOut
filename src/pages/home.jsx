import React from 'react';
import Hero from '../components/hero';
import Trending from '../components/trending';
import Series from '../components/series';
import UpcomingMovies from '../components/upcoming';

const Home = () => {
    return (
        <>
            <Hero />
            <hr className=' mt-8 w-1/2 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700' />
            <Trending />
            <hr className=' mt-8 w-1/2 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700' />
            <Series />
            <hr className=' mt-8 w-1/2 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700' />
            <UpcomingMovies />
        </>
    );
};

export default Home;
