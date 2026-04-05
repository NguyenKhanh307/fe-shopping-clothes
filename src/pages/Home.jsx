import React from 'react';
import HeroBanner from '../components/home/HeroBanner';
// import Features from '../components/home/Features';
import FlashSale from '../components/home/FlashSale';
import CategorySlider from '../components/home/CategorySlider';
import SpecialProducts from '../components/home/SpecialProducts';
import TrendingProducts from '../components/home/TrendingProducts';
import NewArrival from '../components/home/NewArrival';
import Blogs from '../components/home/Blogs';
import Subscription from '../components/home/Subscription';
import BestSelling from '../components/home/BestSelling';
import FavouriteProducts from '../components/home/FavouriteProducts';
import Brands from '../components/home/Brands';
const Home = () => {
    return (
        <div className="default_home">
            <HeroBanner />
            {/* <Features /> */}
            <FlashSale />
            <CategorySlider />
            <SpecialProducts />
            <TrendingProducts />
            <BestSelling/>          {/* Đã thêm */}
            <NewArrival />
            <FavouriteProducts />    {/* Đã thêm */}
            <Brands />
            <Blogs />
            <Subscription />
        </div>
    );
};

export default Home;