import React from 'react';
import { CheckoutFormInfo } from '../../utils/interface';
import { FormTextField, SelectField } from '../common';
import {
  CANADA_PROVINCES,
  CHECKOUT_FORM_COUNTRIES,
  US_STATES,
} from '../../utils/constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface Props {
  info?: CheckoutFormInfo;
  onInfoChanged?: (newInfo: CheckoutFormInfo) => void;
}

export default function ShippingInfoFields({ info, onInfoChanged }: Props) {
  const { isUsingDefaultAddress } = useSelector(
    (state: RootState) => state.user
  );
  return (
    <div className='w-full flex flex-col space-y-6'>
      <div className='grid gap-y-6 md:grid-rows-2 md:grid-cols-2 md:gap-x-4'>
        <FormTextField
          title='Apt./Suite/Unit/Building (Optional)'
          name='unit'
          placeholder='1201'
          value={info?.unit?.value}
          isError={info?.unit?.isError}
          errorMsg={info?.unit?.errorMsg}
          onInputChange={onInfoChanged}
          isDisabled={isUsingDefaultAddress}
        />
        <FormTextField
          title='Street address'
          name='street'
          placeholder='1137 Williams Avenue'
          value={info?.street?.value}
          isError={info?.street?.isError}
          errorMsg={info?.street?.errorMsg}
          onInputChange={onInfoChanged}
          isDisabled={isUsingDefaultAddress}
        />
        <FormTextField
          title='city'
          name='city'
          placeholder='New York'
          value={info?.city?.value}
          isError={info?.city?.isError}
          errorMsg={info?.city?.errorMsg}
          onInputChange={onInfoChanged}
          isDisabled={isUsingDefaultAddress}
        />
        {info?.country?.value ? (
          <SelectField
            selections={
              info.country.value === 'Canada' ? CANADA_PROVINCES : US_STATES
            }
            title={
              info.country.value === 'Canada' ? 'Province/Territory' : 'State'
            }
            name='state'
            value={info?.state?.value}
            isError={info?.state?.isError}
            errorMsg={info?.state?.errorMsg}
            onSelectionChange={onInfoChanged}
            isDisabled={isUsingDefaultAddress}
          />
        ) : (
          <div></div>
        )}

        <FormTextField
          title='postal code'
          name='postalCode'
          placeholder='10001'
          value={info?.postalCode?.value}
          isError={info?.postalCode?.isError}
          errorMsg={info?.postalCode?.errorMsg}
          onInputChange={onInfoChanged}
          isDisabled={isUsingDefaultAddress}
        />
        <SelectField
          selections={CHECKOUT_FORM_COUNTRIES}
          title='country'
          name='country'
          value={info?.country?.value}
          placeholder='Select your country'
          isError={info?.country?.isError}
          errorMsg={info?.country?.errorMsg}
          onSelectionChange={onInfoChanged}
          isDisabled={isUsingDefaultAddress}
        />
      </div>
    </div>
  );
}
