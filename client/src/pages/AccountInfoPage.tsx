import React, { useEffect, useState } from 'react';
import AccountInfoRow from '../components/account/AccountInfoRow';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import {
  FormTextField,
  PasswordFieldWithValidator,
  PrimaryButton,
  SecondaryButton,
} from '../components/common';
import { AccountInfoFormInfo } from '../utils/interface';
import {
  FIELD_NAMES,
  isInputFieldValid,
  areValuesMatch,
} from '../utils/formValidationHelper';
import { TOAST_MESSAGE_TYPE, toastMessage } from '../utils/toastHelper';
import { updateUserInfo } from '../features/user/userSlice';
import { convertAccountInfoToUpdateUserInfoObject } from '../utils/UpdateInfoHelper';

export default function AccountInfoPage() {
  const { user, isLoading } = useSelector((state: RootState) => state.user);
  const [edittingField, setEdittingField] = useState<string | undefined>(
    undefined
  );
  const initialInputValue = {
    firstName: { value: user?.firstName || '', isError: false },
    lastName: { value: user?.lastName || '', isError: false },
  };
  const [input, setInput] = useState<AccountInfoFormInfo>(initialInputValue);
  const dispatch: AppDispatch = useDispatch();

  const onToggleEdit = (
    edittingFieldName: string,
    e?: React.MouseEvent<HTMLElement>
  ) => {
    e?.preventDefault();

    if (!edittingFieldName) {
      setEdittingField(undefined);
      return;
    }

    if (edittingFieldName === edittingField) {
      setEdittingField(undefined);
    } else {
      setEdittingField(edittingFieldName);
    }

    //clear the previous input to prevent unwanted updates
    setInput(initialInputValue);
  };

  const onInputChange = (newInput: AccountInfoFormInfo) => {
    let temp = { ...input, ...newInput };
    setInput(temp);
  };

  const updateAccountInfo = async (e?: React.MouseEvent<HTMLElement>) => {
    e?.preventDefault();

    if (!isInputValid()) {
      toastMessage('Please check your input', TOAST_MESSAGE_TYPE.ERROR);
      return;
    }

    try {
      //generate UpdateUserInfo obj
      let newUserInfo = convertAccountInfoToUpdateUserInfoObject(input);

      await dispatch(
        updateUserInfo({ userId: user?.userId || '', user: newUserInfo })
      ).unwrap();

      toastMessage('Account Info Updated!', TOAST_MESSAGE_TYPE.SUCCESS);
      setEdittingField(undefined);
    } catch (error: any) {
      console.log('Update aacount info', error);
      toastMessage(error.msg, TOAST_MESSAGE_TYPE.ERROR);
    }
  };

  const isInputValid = (): boolean => {
    if (edittingField === 'name') {
      //check first name and last name
      return areNameFieldsValid();
    } else if (edittingField === 'email') {
      //check email and retype email
      return areEmailFieldsValid();
    } else if (edittingField === 'password') {
      //check current password, new password and retype password
      return arePasswordFieldsValid();
    }

    return false;
  };

  const showErrorMessage = (infoAfterValidation: AccountInfoFormInfo) => {
    setInput((prev) => ({ ...prev, ...infoAfterValidation }));
  };

  const areNameFieldsValid = () => {
    return (
      isInputFieldValid(
        FIELD_NAMES.FIRST_NAME,
        input.firstName,
        showErrorMessage
      ) &&
      isInputFieldValid(FIELD_NAMES.LAST_NAME, input.lastName, showErrorMessage)
    );
  };

  const areEmailFieldsValid = () => {
    return (
      isInputFieldValid(FIELD_NAMES.EMAIL, input.email, showErrorMessage) &&
      areValuesMatch(
        FIELD_NAMES.RETYPE_EMAIL,
        input.email?.value,
        input.retypeEmail,
        showErrorMessage
      )
    );
  };

  const arePasswordFieldsValid = () => {
    return (
      isInputFieldValid(
        FIELD_NAMES.CURRENT_PASSWORD,
        input.currentPassword,
        showErrorMessage
      ) &&
      isInputFieldValid(
        FIELD_NAMES.NEW_PASSWORD,
        input.newPassword,
        showErrorMessage
      ) &&
      areValuesMatch(
        FIELD_NAMES.RETYPE_PASSWORD,
        input.newPassword?.value,
        input.retypePassword,
        showErrorMessage
      )
    );
  };

  return (
    <article className='w-full md:pl-10'>
      <h2 className='pb-10 text-h3 leading-h3 tracking-h3 font-bold'>
        Account Information
      </h2>
      <ul className='w-full flex flex-col lg:w-150'>
        {/* Name */}
        <AccountInfoRow
          onToggleEdit={onToggleEdit}
          name='name'
          isEditting={edittingField === 'name'}
          originalInfo={user?.firstName + ' ' + user?.lastName}
        >
          <form className='flex flex-col space-y-4'>
            <FormTextField
              name='firstName'
              title='first name'
              value={input.firstName?.value}
              isError={input.firstName?.isError}
              errorMsg={input.firstName?.errorMsg}
              onInputChange={onInputChange}
            />
            <FormTextField
              name='lastName'
              title='last name'
              value={input.lastName?.value}
              isError={input.lastName?.isError}
              errorMsg={input.lastName?.errorMsg}
              onInputChange={onInputChange}
            />
            <div className='pt-6 flex space-x-4'>
              <SecondaryButton
                text='Cancel'
                onButtonClick={(e) => onToggleEdit('name', e)}
                isDisabled={isLoading}
              />
              <PrimaryButton
                text='Update'
                onButtonClick={updateAccountInfo}
                isDisabled={isLoading}
              />
            </div>
          </form>
        </AccountInfoRow>

        {/* Email */}
        <AccountInfoRow
          name='email'
          originalInfo={user?.email}
          isEditting={edittingField === 'email'}
          onToggleEdit={onToggleEdit}
        >
          <form className='flex flex-col space-y-4'>
            <FormTextField
              name='email'
              title='new email'
              value={input.email?.value}
              isError={input.email?.isError}
              errorMsg={input.email?.errorMsg}
              onInputChange={onInputChange}
            />
            <FormTextField
              name='retypeEmail'
              title='confirm email'
              value={input.retypeEmail?.value}
              isError={input.retypeEmail?.isError}
              errorMsg={input.retypeEmail?.errorMsg}
              onInputChange={onInputChange}
            />
            <div className='pt-6 flex space-x-4'>
              <SecondaryButton
                text='Cancel'
                onButtonClick={(e) => onToggleEdit('email', e)}
                isDisabled={isLoading}
              />
              isDisabled={isLoading}
              <PrimaryButton text='Update' onButtonClick={updateAccountInfo} />
            </div>
          </form>
        </AccountInfoRow>

        {/* Password */}
        <AccountInfoRow
          name='password'
          originalInfo='******'
          isEditting={edittingField === 'password'}
          onToggleEdit={onToggleEdit}
        >
          <form className='flex flex-col space-y-4'>
            <FormTextField
              name='currentPassword'
              title='current password'
              value={input.currentPassword?.value}
              isError={input.currentPassword?.isError}
              errorMsg={input.currentPassword?.errorMsg}
              onInputChange={onInputChange}
              isPasswordField={true}
              inputType='password'
            />
            <PasswordFieldWithValidator
              name='newPassword'
              title='new password'
              value={input.newPassword?.value}
              isError={input.newPassword?.isError}
              errorMsg={input.newPassword?.errorMsg}
              onInputChange={onInputChange}
              inputType='password'
            />
            <FormTextField
              name='retypePassword'
              title='confirm new password'
              value={input.retypePassword?.value}
              isError={input.retypePassword?.isError}
              errorMsg={input.retypePassword?.errorMsg}
              onInputChange={onInputChange}
              inputType='password'
            />
            <div className='pt-6 flex space-x-4'>
              <SecondaryButton
                text='Cancel'
                onButtonClick={(e) => onToggleEdit('password', e)}
                isDisabled={isLoading}
              />
              <PrimaryButton
                text='Update'
                onButtonClick={updateAccountInfo}
                isDisabled={isLoading}
              />
            </div>
          </form>
        </AccountInfoRow>
      </ul>
    </article>
  );
}
