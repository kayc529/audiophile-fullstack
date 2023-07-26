import React from 'react';
import { CheckoutFormInfo } from '../../utils/interface';
import { FormRadioSelection, FormTextField } from '../common';
import CashPaymentInfo from './CashPaymentInfo';

interface Props {
  info?: CheckoutFormInfo;
  onInfoChange?: (newInfo: CheckoutFormInfo) => void;
}

export default function PaymentDetailsFields({ info, onInfoChange }: Props) {
  const onPaymentMethodChanged = (newPaymentMethod: string) => {
    if (onInfoChange) {
      let temp: CheckoutFormInfo = {
        paymentMethod: { value: newPaymentMethod, isError: false },
      };
      if (newPaymentMethod === 'cash') {
        temp = {
          ...temp,
          eMoneyNumber: { value: '', isError: false },
          eMoneyPin: { value: '', isError: false },
        };
      }
      onInfoChange(temp);
    }
  };

  const onInputChange = (newInfo: CheckoutFormInfo) => {
    if (onInfoChange) {
      onInfoChange(newInfo);
    }
  };

  const isUsingEMoney = () => {
    return info?.paymentMethod?.value === 'emoney';
  };

  const isUsingCash = () => {
    return info?.paymentMethod?.value === 'cash';
  };

  const isHavingError = () => {
    return info?.paymentMethod?.isError ? true : false;
  };

  return (
    <div className='w-full flex flex-col space-y-6'>
      <div className='w-full flex flex-col space-y-4 md:space-x-4 md:space-y-0'>
        <div className='w-full flex justify-between'>
          <p className='w-full capitalize text-start text-sm font-bold md:w-1/2'>
            payment method
          </p>
          <p className='text-sm text-errorRed'>
            {isHavingError() && info?.paymentMethod?.errorMsg}
          </p>
        </div>
        <fieldset className='w-full space-y-4 flex justify-end'>
          <div
            className={`w-full border rounded-lg flex flex-col space-y-4 md:w-1/2 ${
              isHavingError() ? 'border-errorRed' : 'border-transparent'
            }`}
          >
            <FormRadioSelection
              id='emoney'
              label='e-Money'
              name='paymentMethod'
              onCheckChange={onPaymentMethodChanged}
              isChecked={isUsingEMoney()}
            />
            <FormRadioSelection
              id='cash'
              label='Cash'
              name='paymentMethod'
              onCheckChange={onPaymentMethodChanged}
              isChecked={isUsingCash()}
            />
          </div>
        </fieldset>
      </div>
      {isUsingEMoney() && (
        <div className='grid gap-y-6 md:grid-rows-1 md:grid-cols-2 md:gap-x-4'>
          <FormTextField
            title='e-Money Number'
            name='eMoneyNumber'
            placeholder='238521993'
            value={info?.eMoneyNumber?.value}
            isError={info?.eMoneyNumber?.isError}
            errorMsg={info?.eMoneyNumber?.errorMsg}
            onInputChange={onInputChange}
          />
          <FormTextField
            title='e-Money Pin'
            name='eMoneyPin'
            inputType='password'
            placeholder='6891'
            value={info?.eMoneyPin?.value}
            isError={info?.eMoneyPin?.isError}
            errorMsg={info?.eMoneyPin?.errorMsg}
            onInputChange={onInputChange}
          />
        </div>
      )}
      {isUsingCash() && <CashPaymentInfo />}
    </div>
  );
}
