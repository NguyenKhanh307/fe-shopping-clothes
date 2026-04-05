import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from '../common/ScrollToTop';
const Layout = () => {
    return (
        <>
            <Header />
            <Navbar />
            <main>
                <Outlet />
            </main>

            <Footer />
            <ScrollToTop />
        </>
    );
};

export default Layout;