import React from 'react';
import { FormTextField } from '../common';
import { LoginRegisterFormInfo } from '../../utils/interface';

interface Props {
  info?: LoginRegisterFormInfo;
  onInputChange?: (newInput: LoginRegisterFormInfo) => void;
}

export default function LoginInputFields({ info, onInputChange }: Props) {
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
        title='password'
        name='password'
        inputType='password'
        value={info?.password?.value}
        isError={info?.password?.isError}
        errorMsg={info?.password?.errorMsg}
        onInputChange={onInputChange}
      />
    </fieldset>
  );
}
