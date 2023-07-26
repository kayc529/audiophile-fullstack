import React from 'react';
import { CheckoutFormInfo } from '../../utils/interface';
import InputFieldsSharedLayout from './InputFieldsSharedLayout';
import ShippingInfoFields from './ShippingInfoFields';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface Props {
  info?: CheckoutFormInfo;
  onInfoChange?: (newInfo: CheckoutFormInfo) => void;
  onDefaultAddressCheck?: () => void;
}

export default function ShippingInfo({
  info,
  onInfoChange,
  onDefaultAddressCheck,
}: Props) {
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <InputFieldsSharedLayout
      title='shipping info'
      showCheckBox={user?.defaultAddress !== undefined}
      onChecked={onDefaultAddressCheck}
    >
      <ShippingInfoFields info={info} onInfoChanged={onInfoChange} />
    </InputFieldsSharedLayout>
  );
}
