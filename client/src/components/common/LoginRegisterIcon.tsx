import React from 'react';
import { HiOutlineUserCircle } from 'react-icons/hi';
import PrimaryButton from './PrimaryButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import LoginUserDropdownMenu from './LoginUserDropdownMenu';
import { closeAllModals } from '../../features/modal/modalSlice';
import { getCart, logoutUser } from '../../features/user/userSlice';
import { TOAST_MESSAGE_TYPE, toastMessage } from '../../utils/toastHelper';

export default function LoginRegisterIcon() {
  const { user } = useSelector((state: RootState) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const goToRegister = () => {
    dispatch(closeAllModals());
    navigate(`/register?redirect=${location.pathname}`);
  };

  const goToLogin = () => {
    dispatch(closeAllModals());
    navigate(`/login?redirect=${location.pathname}`);
  };

  const logout = async () => {
    if (user) {
      try {
        await dispatch(logoutUser()).unwrap();
        toastMessage('Logged out!', TOAST_MESSAGE_TYPE.SUCCESS);
        dispatch(getCart());
      } catch (error: any) {
        console.log(error);
        toastMessage(error.msg, TOAST_MESSAGE_TYPE.ERROR);
      }
    }
  };

  return (
    <div className='login-icon relative flex'>
      <HiOutlineUserCircle
        className='w-7 h-7'
        style={{ color: 'white' }}
        onClick={goToLogin}
      />
      {/* Dropdown Menu */}
      <div className='z-50 login-icon-dropdown absolute -right-10 top-7 flex flex-col items-center'>
        <div className='relative w-full h-5'>
          <div className='absolute top-0 right-1 dropdown-menu-triangle'></div>
        </div>
        <div className='p-6 bg-white rounded-lg drop-shadow-lg'>
          {user ? (
            <div className='flex flex-col items-center space-y-4'>
              <h6 className='w-full text-start text-h6 tracking-h6 font-bold'>
                Hi, {user.firstName}!
              </h6>
              <LoginUserDropdownMenu />
              <PrimaryButton text='logout' onButtonClick={logout} />
            </div>
          ) : (
            <>
              <PrimaryButton text='sign in' onButtonClick={goToLogin} />
              <p className='pt-4 text-sm tracking-sm'>New customer?</p>
              <p
                className='text-sm tracking-sm text-darkOrange underline cursor-pointer hover:text-ashBlack'
                onClick={goToRegister}
              >
                Start here.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
