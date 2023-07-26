import React, { useState } from 'react';
import RegisterInputFields from '../components/login/RegisterInputFields';
import { PrimaryButton, SecondaryButton } from '../components/common';
import { Navigate, useNavigate } from 'react-router-dom';
import { initialRegisterFormInfo } from '../data/initialValues';
import {
  InfoObject,
  LoginRegisterFormInfo,
  RegisterUser,
} from '../utils/interface';
import { FIELD_NAMES, isInputFieldValid } from '../utils/formValidationHelper';
import { TOAST_MESSAGE_TYPE, toastMessage } from '../utils/toastHelper';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { registerUser } from '../features/user/userSlice';

export default function RegisterPage() {
  const { user, isLoading } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const [input, setInput] = useState<LoginRegisterFormInfo>(
    initialRegisterFormInfo
  );
  const dispatch: AppDispatch = useDispatch();

  const register = async (e?: React.MouseEvent<HTMLElement>) => {
    e?.preventDefault();
    if (!isInputValid()) {
      toastMessage('Please check your input', TOAST_MESSAGE_TYPE.ERROR);
      return;
    }

    let newUser: RegisterUser = {
      firstName: input.firstName?.value,
      lastName: input.lastName?.value,
      email: input.email?.value,
      password: input.newPassword?.value,
    };

    //TODO
    try {
      await dispatch(registerUser(newUser)).unwrap();
      toastMessage('Registered, welcome!', TOAST_MESSAGE_TYPE.SUCCESS);
    } catch (error: any) {
      console.log('register', error);
      toastMessage(error.msg, TOAST_MESSAGE_TYPE.ERROR);
    }
  };

  const goToLogin = (e?: React.MouseEvent<HTMLElement>) => {
    e?.preventDefault();
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    let returnTo = params.get('redirect') || '/';
    navigate(`/login?redirect=${returnTo}`);
  };

  const onInputChange = (newInput: LoginRegisterFormInfo) => {
    let temp = { ...input, ...newInput };
    setInput(temp);
  };

  const isInputValid = () => {
    return (
      isEmailValid() &&
      isFirstNameValid() &&
      isLastNameValid() &&
      isPasswordValid() &&
      isRetypePasswordValid()
    );
  };

  const isEmailValid = () => {
    return isInputFieldValid(FIELD_NAMES.EMAIL, input.email, onInputChange);
  };

  const isFirstNameValid = () => {
    return isInputFieldValid(
      FIELD_NAMES.FIRST_NAME,
      input.firstName,
      onInputChange
    );
  };

  const isLastNameValid = () => {
    return isInputFieldValid(
      FIELD_NAMES.LAST_NAME,
      input.lastName,
      onInputChange
    );
  };

  const isPasswordValid = () => {
    return isInputFieldValid(
      FIELD_NAMES.NEW_PASSWORD,
      input.newPassword,
      onInputChange
    );
  };

  const isRetypePasswordValid = () => {
    let temp: InfoObject = input.retypePassword || {
      value: '',
      isError: false,
    };

    if (!input.retypePassword?.value) {
      temp.isError = true;
      temp.errorMsg = 'Cannot be blank';
    } else if (
      input.newPassword?.value &&
      input.retypePassword.value !== input.newPassword.value
    ) {
      temp.isError = true;
      temp.errorMsg = 'Two passwords do not match';
    } else {
      temp.isError = false;
      temp.errorMsg = '';
    }

    onInputChange({ retypePassword: temp });

    return !temp.isError;
  };

  //if user is logged in, redirect to account page
  if (user) {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    let returnTo = params.get('redirect') || '/';
    return <Navigate to={returnTo} replace={true} />;
  }

  return (
    <section className='w-mainContentMobile py-10 flex justify-center md:w-mainContentTablet lg:w-full lg:max-w-mainContent'>
      <form className='relative w-[327px] p-6 border border-darkgrey rounded-lg flex flex-col items-start md:w-[450px] md:p-10'>
        <div className='absolute top-0 left-0 right-0 mx-auto w-30 h-3 bg-darkOrange'></div>
        <h2 className='pb-6 text-h3 tracking-h3 leading-h3 font-bold'>
          Register
        </h2>
        <RegisterInputFields info={input} onInputChange={onInputChange} />
        <div className='w-full pt-6'>
          <PrimaryButton
            text='register'
            fullSize={true}
            onButtonClick={register}
            isDisabled={isLoading}
            showLoadingWhenDisabled={true}
          />
        </div>

        <div className='relative w-full h-[1px] bg-darkGrey mt-12 mb-6'>
          <p className='absolute -top-3 left-0 right-0 w-max mx-auto px-3 text-md tracking-lg font-bold bg-white'>
            Already have an account?
          </p>
        </div>

        <SecondaryButton
          text='login here'
          darkMode={true}
          fullSize={true}
          onButtonClick={goToLogin}
          isDisabled={isLoading}
        />
      </form>
    </section>
  );
}
