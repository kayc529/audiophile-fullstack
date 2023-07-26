import React from 'react';
import { CheckoutFormInfo } from '../../utils/interface';
import InputFieldsSharedLayout from './InputFieldsSharedLayout';
import PaymentDetailsFields from './PaymentDetailsFields';

interface Props {
  info?: CheckoutFormInfo;
  onInfoChange?: (newInfo: CheckoutFormInfo) => void;
}

export default function PaymentDetails({ info, onInfoChange }: Props) {
  return (
    <InputFieldsSharedLayout title='payment details'>
      <PaymentDetailsFields info={info} onInfoChange={onInfoChange} />
    </InputFieldsSharedLayout>
  );
}
