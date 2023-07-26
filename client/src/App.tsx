import ComponentsDemoPage from './pages/ComponentsDemoPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SharedLayout from './pages/SharedLayout';
import HomePage from './pages/HomePage';
import EarphonesPage from './pages/EarphonesPage';
import HeadphonesPage from './pages/HeadphonesPage';
import SpeakersPage from './pages/SpeakersPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import Modal from 'react-modal';
import { ModalShade } from './components/common';
import { useEffect } from 'react';
import { setAnimations } from './utils/scrollingAnimation';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import LoginRegisterSharedLayout from './pages/LoginRegisterSharedLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserAccountSharedLayout from './components/account/UserAccountSharedLayout';
import OrdersPage from './pages/OrdersPage';
import AccountInfoPage from './pages/AccountInfoPage';
import SavedAddressesPage from './pages/SavedAddressesPage';
import { AppDispatch } from './store';
import { useDispatch } from 'react-redux';
import { getCart } from './features/user/userSlice';

Modal.setAppElement('#root');

const App = () => {
  const dispatch: AppDispatch = useDispatch();

  //get shopping cart whenever the app is loaded
  useEffect(() => {
    dispatch(getCart());
  }, []);

  //scrolling animation
  useEffect(() => {
    window.addEventListener('scroll', setAnimations);
    return () => {
      window.removeEventListener('scroll', setAnimations);
    };
  }, []);

  //call it once to detect scrolling position initially
  setAnimations();

  return (
    <>
      <ToastContainer
        className='toast-position'
        position='top-right'
        autoClose={1500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      <ModalShade />
      <BrowserRouter>
        <Routes>
          <Route element={<SharedLayout />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/earphones' element={<EarphonesPage />} />
            <Route path='/headphones' element={<HeadphonesPage />} />
            <Route path='/speakers' element={<SpeakersPage />} />
            <Route path='/product/:productId' element={<ProductDetailPage />} />
            <Route path='/checkout' element={<CheckoutPage />} />
            <Route element={<UserAccountSharedLayout />}>
              <Route path='/my-account/orders' element={<OrdersPage />} />
              <Route
                path='/my-account/account-info'
                element={<AccountInfoPage />}
              />
              <Route
                path='/my-account/address'
                element={<SavedAddressesPage />}
              />
            </Route>
            <Route path='/demo' element={<ComponentsDemoPage />} />
          </Route>
          <Route element={<LoginRegisterSharedLayout />}>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
          </Route>
          <Route path='/demo2' element={<ComponentsDemoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
