import React from 'react';
import HeroSection from '../components/hero/HeroSection';
import CityMap from '../components/city/CityMap';
import Leaderboard from '../components/leaderboard/Leaderboard';

const Home = () => {
    return (
        <div>
            <HeroSection />
            <CityMap />
            <Leaderboard />
        </div>
    );
};

export default Home;