import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const menuItems = ['orders', 'account-info', 'address'];
const pageNames = new Map([
  ['orders', 'orders'],
  ['account-info', 'account information'],
  ['address', 'saved addresses'],
]);

export default function AccountSideBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isOnThisPage = (pageName: string) => {
    let index = location.pathname.lastIndexOf('/');
    let currentPage = location.pathname.substring(index + 1);
    return currentPage === pageName;
  };

  const getPageName = (path: string) => {
    return pageNames.get(path);
  };

  const goToPage = (path: string) => {
    navigate(`/my-account/${path}`);
  };

  return (
    <aside className='w-full pt-10 flex md:w-40 md:pt-0 md:pb-20 lg::w-50'>
      <ul className='w-full flex flex-col items-center space-y-4 md:items-start'>
        {menuItems.map((menuItem) => {
          return (
            <li
              key={menuItem}
              className='w-full border-b-[1px] last:border-transparent md:border-b-0'
              onClick={() => goToPage(menuItem)}
            >
              <p
                className={`${
                  isOnThisPage(menuItem) ? 'font-bold' : 'hover:text-darkOrange'
                } pb-4 capitalize text-center text-h6 tracking-h6 cursor-pointer md:pb-0 md:text-start md:text-lg md:tracking-lg`}
              >
                {getPageName(menuItem)}
              </p>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
