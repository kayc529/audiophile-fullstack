import React, { useEffect } from 'react';
import { Footer, Header } from '../components/common';
import { Outlet, useLocation } from 'react-router-dom';
import { scrollToTop } from '../utils/scrollHelper';

export default function LoginRegisterSharedLayout() {
  const location = useLocation();

  //resume top position when a new page is loaded
  useEffect(() => {
    scrollToTop();
  }, [location]);

  return (
    <main className='w-full flex flex-col items-center'>
      <Header showLogoOnly={true} />
      <Outlet />
      <Footer />
    </main>
  );
}
