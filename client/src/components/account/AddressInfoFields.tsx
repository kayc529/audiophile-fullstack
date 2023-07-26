import React from 'react';
import { AddressFormInfo } from '../../utils/interface';
import {
  FormTextField,
  PrimaryButton,
  SecondaryButton,
  SelectField,
} from '../common';
import {
  CANADA_PROVINCES,
  CHECKOUT_FORM_COUNTRIES,
  US_STATES,
} from '../../utils/constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface Props {
  address: AddressFormInfo;
  onInputChange?: (newInput: AddressFormInfo) => void;
  onCancel?: () => void;
  onUpdate?: () => void;
}

export default function AddressInfoFields({
  address,
  onInputChange,
  onCancel,
  onUpdate,
}: Props) {
  const { isLoading } = useSelector((state: RootState) => state.user);
  const cancel = (e?: React.MouseEvent<HTMLElement>) => {
    e?.preventDefault();

    if (onCancel) {
      onCancel();
    }
  };

  const update = (e?: React.MouseEvent<HTMLElement>) => {
    e?.preventDefault();
    if (onUpdate) {
      onUpdate();
    }
  };

  const changeInput = (newInput: AddressFormInfo) => {
    if (onInputChange) {
      onInputChange(newInput);
    }
  };

  const getStates = () => {
    if (address.country?.value) {
      return address.country.value === 'Canada' ? CANADA_PROVINCES : US_STATES;
    }
    return [];
  };

  return (
    <form className='w-full flex flex-col lg:w-2/3'>
      <div className='grid gap-x-4 gap-y-4 md:grid-cols-2 md:gap-y-2 '>
        <FormTextField
          title='recipient'
          name='name'
          value={address.name?.value}
          isError={address.name?.isError}
          errorMsg={address.name?.errorMsg}
          onInputChange={changeInput}
        />
        <FormTextField
          title='phone number'
          name='phoneNumber'
          value={address.phoneNumber?.value}
          isError={address.phoneNumber?.isError}
          errorMsg={address.phoneNumber?.errorMsg}
          onInputChange={changeInput}
        />
        <FormTextField
          title='Apt./Suite/Unit/Building (Optional)'
          name='unit'
          value={address.unit?.value}
          isError={address.unit?.isError}
          errorMsg={address.unit?.errorMsg}
          onInputChange={changeInput}
        />
        <FormTextField
          title='street address'
          name='street'
          value={address.street?.value}
          isError={address.street?.isError}
          errorMsg={address.street?.errorMsg}
          onInputChange={changeInput}
        />
        <FormTextField
          title='city'
          name='city'
          value={address.city?.value}
          isError={address.city?.isError}
          errorMsg={address.city?.errorMsg}
          onInputChange={changeInput}
        />
        {address.country?.value ? (
          <SelectField
            selections={getStates()}
            title='state'
            name='state'
            value={address.state?.value}
            isError={address.state?.isError}
            errorMsg={address.state?.errorMsg}
            onSelectionChange={changeInput}
          />
        ) : (
          <div></div>
        )}

        <FormTextField
          title='postal Code'
          name='postalCode'
          value={address.postalCode?.value}
          isError={address.postalCode?.isError}
          errorMsg={address.postalCode?.errorMsg}
          onInputChange={changeInput}
        />
        <SelectField
          selections={CHECKOUT_FORM_COUNTRIES}
          title='country'
          name='country'
          value={address.country?.value}
          isError={address.country?.isError}
          errorMsg={address.country?.errorMsg}
          onSelectionChange={changeInput}
        />
      </div>

      <div className='py-6 flex space-x-4'>
        <SecondaryButton
          text='cancel'
          onButtonClick={cancel}
          isDisabled={isLoading}
        />
        <PrimaryButton
          text='Update'
          onButtonClick={update}
          isDisabled={isLoading}
          showLoadingWhenDisabled={true}
        />
      </div>
    </form>
  );
}
