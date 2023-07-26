import OrderCompletedModal from '../components/checkout/OrderCompletedModal';
import {
  PrimaryButton,
  SecondaryButton,
  TertiaryButton,
  FormTextField,
  FormRadioSelection,
  Counter,
  CartModal,
  SelectField,
  Loader,
} from '../components/common';
import { useState } from 'react';

const ComponentsDemoPage = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);

  const onPaymentMethodChanged = (paymentMethod: string) => {
    setSelectedPaymentMethod(paymentMethod);
  };
  return (
    <div className='w-full bg-blue-100 flex flex-col items-center space-y-6  md:max-w-mainContentTablet lg:max-w-mainContent'>
      <PrimaryButton text='see product' />
      <SecondaryButton text='see product' darkMode={false} />
      <SecondaryButton text='see product' darkMode={true} />
      <TertiaryButton text='shop' />
      <div className='w-1/3'>
        <FormTextField
          title='name'
          name='name'
          placeholder='Insert your name'
          errorMsg='Wrong format'
        />
      </div>
      <div className='w-1/3'>
        <SelectField
          selections={['Canada', 'United States']}
          title='country'
          name='country'
        />
      </div>

      <fieldset className='w-1/3'>
        <FormRadioSelection
          id='emoney'
          label='e-Money'
          name='paymentMethod'
          onCheckChange={onPaymentMethodChanged}
          isChecked={selectedPaymentMethod === 'emoney'}
        />
        <FormRadioSelection
          id='creditcard'
          label='Credit card'
          name='paymentMethod'
          onCheckChange={onPaymentMethodChanged}
          isChecked={selectedPaymentMethod === 'creditcard'}
        />
      </fieldset>
      <Counter count={1} />
      <CartModal />
      {/* <OrderCompletedModal order={undefined} /> */}
      <Loader />
    </div>
  );
};

export default ComponentsDemoPage;
