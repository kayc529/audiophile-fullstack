import { Order } from '../../utils/interface';
import OrderSummaryItems from './OrderSummaryItems';

interface Props {
  order?: Order;
}

export default function OrderSummary({ order }: Props) {
  return (
    <div className='h-max bg-mainBlack rounded-lg flex flex-col justify-between items-center overflow-hidden md:flex-row'>
      <OrderSummaryItems cartItems={order?.items} />
      <div className='w-full py-4 pl-6 bg-black flex flex-col justify-center md:w-50 md:h-[140px] md:pl-8'>
        <p className='pb-2 uppercase text-white text-lg tracking-lg leading-lg opacity-50'>
          grand total
        </p>
        {/* TODO: will be replaced by the grand total amount of an Order object */}
        <h6 className='text-white text-h6 tracking-h6 leading-h6 font-bold'>
          $ {order?.grandTotal}
        </h6>
      </div>
    </div>
  );
}
