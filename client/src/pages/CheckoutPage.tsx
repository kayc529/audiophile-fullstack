import React, { useEffect, useState } from 'react';
import CheckoutForm from '../components/checkout/CheckoutForm';
import Summary from '../components/checkout/Summary';
import { PrimaryButton, TertiaryButton } from '../components/common';
import { CheckoutFormInfo, Order } from '../utils/interface';
import {
  initialCheckFormInfo,
  initialAddressFormInfo,
} from '../data/initialValues';
import { useNavigate } from 'react-router-dom';
import OrderCompletedModal from '../components/checkout/OrderCompletedModal';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { toggleOrderComplete } from '../features/modal/modalSlice';
import { isInputFieldValid, FIELD_NAMES } from '../utils/formValidationHelper';
import { TOAST_MESSAGE_TYPE, toastMessage } from '../utils/toastHelper';
import { convertAddressToFormInfo } from '../utils/addressHelper';
import {
  getCart,
  toggleIsUsingDefaultAddress,
} from '../features/user/userSlice';
import { getOrderObject } from '../utils/orderHelper';
import { createOrder } from '../features/order/orderSlice';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { isOrderCompleteOpen } = useSelector(
    (state: RootState) => state.modal
  );
  const { cart, user, isUsingDefaultAddress } = useSelector(
    (state: RootState) => state.user
  );
  const [info, setInfo] = useState<CheckoutFormInfo>(initialCheckFormInfo);
  const [order, setOrder] = useState<Order | undefined>(undefined);

  useEffect(() => {
    if (user && isUsingDefaultAddress) {
      fillAddressFields();
    } else {
      emptyDefaultAddress();
    }
  }, [isUsingDefaultAddress]);

  useEffect(() => {
    if (!user) {
      toggleIsUsingDefaultAddress();
    }
  }, [user]);

  useEffect(() => {
    if (order) {
      dispatch(toggleOrderComplete());
    }
  }, [order, dispatch]);

  const fillAddressFields = () => {
    if (user?.defaultAddress) {
      let addressInfo = convertAddressToFormInfo(user.defaultAddress);
      setInfo({ ...info, ...addressInfo });
    }
  };

  const emptyDefaultAddress = () => {
    setInfo({ ...info, ...initialAddressFormInfo });
  };

  const onInputChange = (newInfo: CheckoutFormInfo) => {
    if (newInfo.country) {
      newInfo = { ...newInfo, state: { value: '', isError: false } };
    }

    let temp = { ...info, ...newInfo };
    setInfo(temp);
  };

  const checkOut = async (e?: React.MouseEvent<HTMLElement>) => {
    e?.preventDefault();
    if (!isFormInfoValid()) {
      toastMessage('Please check your input', TOAST_MESSAGE_TYPE.ERROR);
      return;
    }

    if (cart) {
      const orderObj: Order = getOrderObject(cart.items, info);
      orderObj.customerId = user?.userId || 'N/A';

      try {
        const res = await dispatch(createOrder(orderObj)).unwrap();
        setOrder(res.order);
        dispatch(getCart());
      } catch (error: any) {
        console.log('Check out', error);
        toastMessage(error.msg, TOAST_MESSAGE_TYPE.ERROR);
      }
    }
  };

  const isFormInfoValid = (): boolean => {
    const isEmailValid = user ? true : isEmailInfoValid();

    return (
      isNameInfoValid() &&
      isPhoneNumberInfoValid() &&
      isStreetInfoValid() &&
      isCityInfoValid() &&
      isPostalCodeInfoValid() &&
      isCountryValid() &&
      isStateInfoValid() &&
      isPaymentMethodValid() &&
      isEmailValid
    );
  };

  const isNameInfoValid = (): boolean => {
    return isInputFieldValid(FIELD_NAMES.NAME, info.name, onInputChange);
  };

  const isEmailInfoValid = (): boolean => {
    return isInputFieldValid(FIELD_NAMES.EMAIL, info.email, onInputChange);
  };

  const isPhoneNumberInfoValid = () => {
    return isInputFieldValid(
      FIELD_NAMES.PHONE_NUMBER,
      info.phoneNumber,
      onInputChange
    );
  };

  const isStreetInfoValid = () => {
    return isInputFieldValid(FIELD_NAMES.STREET, info.street, onInputChange);
  };

  const isCityInfoValid = () => {
    return isInputFieldValid(FIELD_NAMES.CITY, info.city, onInputChange);
  };

  const isStateInfoValid = () => {
    return isInputFieldValid(FIELD_NAMES.STATE, info.state, onInputChange);
  };

  const isPostalCodeInfoValid = () => {
    return isInputFieldValid(
      FIELD_NAMES.POSTAL_CODE,
      info.postalCode,
      onInputChange
    );
  };

  const isCountryValid = () => {
    return isInputFieldValid(FIELD_NAMES.COUNTRY, info.country, onInputChange);
  };

  const isPaymentMethodValid = () => {
    if (info.paymentMethod?.value === 'emoney') {
      return isEMoneyNumberValid() && isEMoneyPinValid();
    }

    return isInputFieldValid(
      FIELD_NAMES.PAYMENT_METHOD,
      info.paymentMethod,
      onInputChange
    );
  };

  const isEMoneyNumberValid = () => {
    return isInputFieldValid(
      FIELD_NAMES.E_MONEY_NUMBER,
      info.eMoneyNumber,
      onInputChange
    );
  };

  const isEMoneyPinValid = () => {
    return isInputFieldValid(
      FIELD_NAMES.E_MONEY_PIN,
      info.eMoneyPin,
      onInputChange
    );
  };

  const onDefaultAddressCheck = () => {
    if (user?.defaultAddress) {
      dispatch(toggleIsUsingDefaultAddress());
      return;
    }
    toastMessage("You don't have a default address", TOAST_MESSAGE_TYPE.ERROR);
  };

  const goBack = () => {
    navigate(-1);
  };

  const goToHome = () => {
    navigate('/');
  };

  return (
    <>
      <section className='relative w-full py-12 flex flex-col items-center bg-mainGrey md:px-6 md:pt-12 md:pb-30 lg:pt-[90px]'>
        {cart && cart.items.length === 0 ? (
          <article className='w-max py-12 px-8 my-auto border-0 rounded-lg bg-white flex flex-col items-center justify-center'>
            <h3 className='text-h5 leading-h5 tracking-h5 md:text-h3 md:leading-h3 md:tracking-h3'>
              Your cart is empty!
            </h3>
            <img
              className='w-30 h-auto my-8'
              src='/assets/shared/desktop/icon-cart-grey.svg'
              alt='cart'
            />
            <PrimaryButton text='go shopping' onButtonClick={goToHome} />
          </article>
        ) : (
          <article className='w-full max-w-mainContentMobile flex flex-col space-y-6 md:max-w-mainContentTablet lg:max-w-mainContent lg:space-y-10'>
            <TertiaryButton left={true} text='go back' onButtonClick={goBack} />
            <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-7 lg:space-y-0'>
              <CheckoutForm
                info={info}
                onInfoChange={onInputChange}
                onDefaultAddressCheck={onDefaultAddressCheck}
              />
              <Summary onCheckOut={checkOut} />
            </div>
          </article>
        )}
        {/* Order Complete modal */}
        {isOrderCompleteOpen && (
          <div className='z-modalDialog absolute w-max h-max my-auto left-0 right-0 mx-auto'>
            <OrderCompletedModal order={order} />
          </div>
        )}
      </section>
    </>
  );
}
