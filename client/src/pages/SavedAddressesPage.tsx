import { useEffect, useState } from 'react';
import SavedAddress from '../components/account/SavedAddress';
import { Address, AddressFormInfo } from '../utils/interface';
import AddressInfoFields from '../components/account/AddressInfoFields';
import { convertAddressToFormInfo } from '../utils/addressHelper';
import AddShippingAddressButton from '../components/account/AddShippingAddressButton';
import { FIELD_NAMES, isInputFieldValid } from '../utils/formValidationHelper';
import { TOAST_MESSAGE_TYPE, toastMessage } from '../utils/toastHelper';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import {
  deleteUserAddress,
  getUserAddresses,
  updateUserAddresses,
  updateUserInfo,
} from '../features/user/userSlice';
import { getUpdateAddressObject } from '../utils/UpdateInfoHelper';
import { Loader } from '../components/common';

export default function SavedAddressesPage() {
  const { user, defaultAddress, addresses, isLoading } = useSelector(
    (state: RootState) => state.user
  );
  const [isNew, setIsNew] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<Address | undefined>(
    undefined
  );
  const [input, setInput] = useState<AddressFormInfo>({});
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    getAddresses();
  }, []);

  useEffect(() => {
    if (currentAddress) {
      //convert address to address form info object
      setInput(convertAddressToFormInfo(currentAddress));
    } else {
      setInput({});
    }
  }, [currentAddress]);

  const getAddresses = async () => {
    try {
      await dispatch(getUserAddresses(user?.userId)).unwrap();
    } catch (error) {
      console.log('Get addresses', error);
      toastMessage('Failed to get addresses', TOAST_MESSAGE_TYPE.ERROR);
    }
  };

  const toggleEditAddress = (address?: Address) => {
    //close add new address
    if (isNew) {
      toggleNewAddress();
    }

    setCurrentAddress(isEdit ? undefined : address);
    setIsEdit((prev) => !prev);
  };

  const toggleNewAddress = () => {
    if (isLoading) {
      return;
    }

    if (!isNew) {
      //check saved address count
      //toast message if save address === 3
      if (addresses.length >= 3) {
        toastMessage(
          'You cannot save more than 3 addresses',
          TOAST_MESSAGE_TYPE.ERROR
        );
        return;
      }
    }

    //close edit address
    if (isEdit) {
      toggleEditAddress();
    }

    setInput({});
    setIsNew((prev) => !prev);
  };

  const onInputChange = (newInput: AddressFormInfo) => {
    let temp = { ...input, ...newInput };
    //reset states when country is changed
    if (newInput.country) {
      temp.state = { value: '', isError: false };
    }
    setInput(temp);
  };

  const updateAddress = async () => {
    if (!isInputValid()) {
      toastMessage('Please check your input', TOAST_MESSAGE_TYPE.ERROR);
      return;
    }

    try {
      let newAddress = getUpdateAddressObject(input);
      newAddress._id = currentAddress?._id || '';
      await dispatch(
        updateUserAddresses({ userId: user?.userId || '', address: newAddress })
      ).unwrap();

      toggleEditAddress();
      toastMessage('Address updated', TOAST_MESSAGE_TYPE.SUCCESS);
    } catch (error: any) {
      console.log(error);
      toastMessage(error.msg, TOAST_MESSAGE_TYPE.ERROR);
    }
  };

  const addNewAddress = async () => {
    if (!isInputValid()) {
      toastMessage('Please check your input', TOAST_MESSAGE_TYPE.ERROR);
      return;
    }

    try {
      let newAddress = getUpdateAddressObject(input);

      await dispatch(
        updateUserAddresses({ userId: user?.userId || '', address: newAddress })
      ).unwrap();

      toggleNewAddress();
      toastMessage('Address added', TOAST_MESSAGE_TYPE.SUCCESS);

      //update address
      getAddresses();
    } catch (error: any) {
      console.log('Add new address', error);
      toastMessage(error.msg, TOAST_MESSAGE_TYPE.ERROR);
    }
  };

  const removeAddress = async (address: Address) => {
    try {
      await dispatch(deleteUserAddress(address._id || '')).unwrap();
      toastMessage('Address removed', TOAST_MESSAGE_TYPE.SUCCESS);
      //update address
      getAddresses();
    } catch (error: any) {
      console.log('Add new address', error);
      toastMessage(error.msg, TOAST_MESSAGE_TYPE.ERROR);
    }
  };

  const setAddressAsDefault = async (address: Address) => {
    try {
      await dispatch(
        updateUserInfo({
          userId: user?.userId || '',
          user: { defaultAddress: address },
        })
      ).unwrap();
      toastMessage('Default address updated', TOAST_MESSAGE_TYPE.SUCCESS);
      //update address
      getAddresses();
    } catch (error: any) {
      console.log('Add new address', error);
      toastMessage(error.msg, TOAST_MESSAGE_TYPE.ERROR);
    }
  };

  const isInputValid = (): boolean => {
    return (
      isNameValid() &&
      isStreetValid() &&
      isCityValid() &&
      isStateValid() &&
      isPostalCodeValid() &&
      isCountryValid()
    );
  };

  const onFieldValidated = (feedback: AddressFormInfo) => {
    let temp = { ...input, ...feedback };
    setInput(temp);
  };

  const isNameValid = () => {
    return isInputFieldValid(FIELD_NAMES.NAME, input.name, onFieldValidated);
  };

  const isStreetValid = () => {
    return isInputFieldValid(
      FIELD_NAMES.STREET,
      input.street,
      onFieldValidated
    );
  };

  const isCityValid = () => {
    return isInputFieldValid(FIELD_NAMES.CITY, input.city, onFieldValidated);
  };

  const isStateValid = () => {
    return isInputFieldValid(FIELD_NAMES.STATE, input.state, onFieldValidated);
  };

  const isPostalCodeValid = () => {
    return isInputFieldValid(
      FIELD_NAMES.POSTAL_CODE,
      input.postalCode,
      onFieldValidated
    );
  };

  const isCountryValid = () => {
    return isInputFieldValid(
      FIELD_NAMES.COUNTRY,
      input.country,
      onFieldValidated
    );
  };

  const displaySavedAddresses = () => {
    return addresses.length > 0 ? (
      <ul className='grid gap-x-5 gap-y-4 md:grid-cols-2 lg:grid-cols-3'>
        {addresses.map((address, index) => {
          return (
            <SavedAddress
              isDefault={address._id === defaultAddress?._id}
              key={index}
              address={address}
              onEdit={toggleEditAddress}
              onRemove={removeAddress}
              onSetAsDefault={setAddressAsDefault}
            />
          );
        })}
      </ul>
    ) : (
      <div className=''>No Saved Addresses</div>
    );
  };

  return (
    <article className='w-full md:pl-10'>
      <h2 className='pb-10 text-h3 leading-h3 tracking-h3 font-bold'>
        Saved Addresses
      </h2>
      {/* Saved addresses list */}
      {isEdit ? (
        <>
          <h4 className='pb-6 capitalize text-h5 tracking-h5'>edit address</h4>
          <AddressInfoFields
            address={input}
            onCancel={toggleEditAddress}
            onUpdate={updateAddress}
            onInputChange={onInputChange}
          />
        </>
      ) : isLoading ? (
        <Loader />
      ) : (
        displaySavedAddresses()
      )}

      {/* Breaking line */}
      <div className='my-9 w-full h-[1px] bg-black opacity-30'></div>

      {/* Add shipping address button */}
      {isNew ? (
        <>
          <h4 className='w-max pb-6 capitalize text-h5 tracking-h5'>
            add new address
          </h4>
          <AddressInfoFields
            address={input}
            onCancel={toggleNewAddress}
            onUpdate={addNewAddress}
            onInputChange={onInputChange}
          />
        </>
      ) : (
        <AddShippingAddressButton onButtonClick={toggleNewAddress} />
      )}
    </article>
  );
}
