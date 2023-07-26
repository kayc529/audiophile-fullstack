import { Outlet, useLocation } from 'react-router-dom';
import { Footer, Header } from '../components/common';
import { useEffect } from 'react';
import { scrollToTop } from '../utils/scrollHelper';

const SharedLayout = () => {
  const location = useLocation();

  //resume top position when a new page is loaded
  useEffect(() => {
    scrollToTop();
  }, [location]);

  return (
    <main className='w-full min-h-screen flex flex-col items-center'>
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};

export default SharedLayout;
