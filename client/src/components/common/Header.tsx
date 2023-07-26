import { AppDispatch, RootState } from '../../store';
import Cart from './Cart';
import Logo from './Logo';
import Navbar from './Navbar';
import NavbarMenu from './NavbarMenu';
import { useDispatch, useSelector } from 'react-redux';
import ProductCategories from './ProductCategories';
import CartModal from './CartModal';
import {
  toggleCart,
  toggleHeaderMenu,
  closeAllModals,
} from '../../features/modal/modalSlice';
import { useWindowSize } from '../../hooks/useWindowSize';
import { useEffect } from 'react';
import { SCREENSIZE } from '../../utils/constants';
import LoginRegisterIcon from './LoginRegisterIcon';

interface Props {
  showLogoOnly?: boolean;
}

const Header = ({ showLogoOnly = false }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const { isHeaderMenuOpen, isCartOpen } = useSelector(
    (state: RootState) => state.modal
  );
  const [width] = useWindowSize();

  useEffect(() => {
    if (width >= SCREENSIZE.LG) {
      closeMenu();
    }
  }, [width]);

  const toggleMenu = () => {
    if (!isHeaderMenuOpen) {
      dispatch(closeAllModals());
      dispatch(toggleHeaderMenu());
    } else {
      dispatch(toggleHeaderMenu());
    }
  };

  const toggleCartMenu = () => {
    if (!isCartOpen) {
      dispatch(closeAllModals());
      dispatch(toggleCart());
    } else {
      dispatch(toggleCart());
    }
  };

  const closeMenu = () => {
    if (isHeaderMenuOpen) {
      dispatch(toggleHeaderMenu());
    }
  };

  return (
    <header
      className={`z-modalDialog relative w-full h-headerTablet bg-backgroundBlack flex justify-center lg:h-header`}
    >
      <div
        className={`${
          showLogoOnly ? 'flex' : 'header-columns'
        } relative w-full px-4 items-center border-b border-transparentWhite md:max-w-mainContentTablet lg:max-w-mainContent`}
      >
        {/* Tablet & Mobile Hamburger Menu Button */}
        {!showLogoOnly && <NavbarMenu onMenuClick={toggleMenu} />}

        {/* Logo */}
        <div
          className={
            showLogoOnly
              ? 'mx-auto'
              : 'justify-self-center md:justify-self-start'
          }
          onClick={closeMenu}
        >
          <Logo />
        </div>

        {/* Nav */}
        {!showLogoOnly && (
          <div className='hidden lg:block'>
            <Navbar />
          </div>
        )}

        {/* User & Cart Icons */}
        {!showLogoOnly && (
          <div className='space-x-6 flex justify-end items-center'>
            <LoginRegisterIcon />
            <Cart onCartClicked={toggleCartMenu} />
          </div>
        )}

        {/* Cart Modal */}
        {isCartOpen && (
          <div className='checkout-modal z-modalDialog absolute top-[122px] right-0 lg:top-[129px]'>
            <CartModal />
          </div>
        )}
      </div>

      {/* Menu Modal*/}
      {isHeaderMenuOpen && (
        <div className='dropdown-menu absolute left-0 top-[90px] w-full h-max pt-14 pb-16 bg-white flex justify-center lg:hidden'>
          <ProductCategories />
        </div>
      )}
    </header>
  );
};

export default Header;
