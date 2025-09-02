import React from 'react';
import { Outlet, useNavigation } from 'react-router';
import Footer from '../Components/Footer';
import Loader from '../Components/Loader';
import Navbar from '../Components/Navbar';

const RootLayout = () => {
      const { state } = useNavigation();
    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar></Navbar>
           <main className="flex-grow">
        {state === 'loading' ? <Loader /> : <Outlet />}
      </main>
          <footer>
              <Footer></Footer>
          </footer>
        </div>
    );
};

export default RootLayout;