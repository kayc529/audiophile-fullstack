import React from 'react';
import InputFieldsSharedLayout from './InputFieldsSharedLayout';
import BillingDetailsFields from './BillingDetailsFields';
import { CheckoutFormInfo } from '../../utils/interface';

interface Props {
  info?: CheckoutFormInfo;
  onInfoChange?: (newInfo: CheckoutFormInfo) => void;
}

export default function BillingDetails({ info, onInfoChange }: Props) {
  return (
    <InputFieldsSharedLayout title='billing details'>
      <BillingDetailsFields info={info} onInfoChange={onInfoChange} />
    </InputFieldsSharedLayout>
  );
}
