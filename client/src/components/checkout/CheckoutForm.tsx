import { CheckoutFormInfo } from '../../utils/interface';
import BillingDetails from './BillingDetails';
import PaymentDetails from './PaymentDetails';
import ShippingInfo from './ShippingInfo';

interface Props {
  info?: CheckoutFormInfo;
  onInfoChange?: (newInfo: CheckoutFormInfo) => void;
  onDefaultAddressCheck?: () => void;
}

export default function CheckoutForm({
  info,
  onInfoChange,
  onDefaultAddressCheck,
}: Props) {
  return (
    <form className='w-full p-6 bg-white rounded-lg space-y-8 md:p-7 md:space-y-10 lg:w-2/3 lg:max-w-[730px] lg:p-12 lg:space-y-12'>
      <h3 className='uppercase text-h4 leading-h4 tracking-h4 font-bold md:text-h3 md:leading-h3 md:tracking-h3'>
        checkout
      </h3>
      <BillingDetails info={info} onInfoChange={onInfoChange} />
      <ShippingInfo
        info={info}
        onInfoChange={onInfoChange}
        onDefaultAddressCheck={onDefaultAddressCheck}
      />
      <PaymentDetails info={info} onInfoChange={onInfoChange} />
    </form>
  );
}
