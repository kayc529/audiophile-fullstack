import React from 'react';
import { FormTextField, PasswordFieldWithValidator } from '../common';
import { LoginRegisterFormInfo } from '../../utils/interface';

interface Props {
  info?: LoginRegisterFormInfo;
  onInputChange?: (newInput: LoginRegisterFormInfo) => void;
}

export default function RegisterInputFields({ info, onInputChange }: Props) {
  return (
    <fieldset className='w-full flex flex-col space-y-4'>
      <FormTextField
        title='email'
        name='email'
        value={info?.email?.value}
        isError={info?.email?.isError}
        errorMsg={info?.email?.errorMsg}
        onInputChange={onInputChange}
      />
      <FormTextField
        title='first name'
        name='firstName'
        value={info?.firstName?.value}
        isError={info?.firstName?.isError}
        errorMsg={info?.firstName?.errorMsg}
        onInputChange={onInputChange}
      />
      <FormTextField
        title='last name'
        name='lastName'
        value={info?.lastName?.value}
        isError={info?.lastName?.isError}
        errorMsg={info?.lastName?.errorMsg}
        onInputChange={onInputChange}
      />
      <PasswordFieldWithValidator
        title='password'
        name='newPassword'
        inputType='password'
        value={info?.newPassword?.value}
        isError={info?.newPassword?.isError}
        errorMsg={info?.newPassword?.errorMsg}
        onInputChange={onInputChange}
      />
      <FormTextField
        title='retype password'
        name='retypePassword'
        inputType='password'
        value={info?.retypePassword?.value}
        isError={info?.retypePassword?.isError}
        errorMsg={info?.retypePassword?.errorMsg}
        onInputChange={onInputChange}
      />
    </fieldset>
  );
}
