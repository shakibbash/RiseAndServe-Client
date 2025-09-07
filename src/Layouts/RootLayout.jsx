import React from 'react';
import { Outlet, useNavigation } from 'react-router';
import Footer from '../Components/Footer';
import Loader from '../Components/Loader';
import Navbar from '../Components/Navbar';
import { useTheme } from '../Provider/ThemeContext';

const RootLayout = () => {
      const { state } = useNavigation();
        const { isDarkMode } = useTheme();
    return (
        
        <div className={`flex flex-col min-h-screen ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'}`}>
            <Navbar></Navbar>
           <main className={`flex-grow  ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        {state === 'loading' ? <Loader /> : <Outlet />}
      </main>
          <footer>
              <Footer></Footer>
          </footer>
        </div>
    );
};

export default RootLayout;

