import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AccountSideBar from './AccountSideBar';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export default function UserAccountSharedLayout() {
  const { user } = useSelector((state: RootState) => state.user);

  if (!user) {
    return <Navigate to='/' replace={true} />;
  }

  return (
    <div className='w-mainContentMobile py-16 flex flex-col-reverse md:flex-row md:w-full md:max-w-mainContentTablet md:px-4 lg:max-w-mainContent'>
      <AccountSideBar />
      <Outlet />
    </div>
  );
}
