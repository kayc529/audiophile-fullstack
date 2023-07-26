import React, { useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { Order } from '../../utils/interface';
import OrderItem from './OrderItem';
import { formatOrderId } from '../../utils/orderHelper';
import { convertToSystemTime } from '../../utils/dateHelper';

interface Props {
  order: Order;
}

export default function OrderRecord({ order }: Props) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const toggleDetails = () => {
    setIsDetailsOpen((prev) => !prev);
  };

  return (
    <li className='w-full p-6 pb-0 rounded-lg border-[1px] flex flex-col md:px-8'>
      <div className='flex flex-col'>
        {/* Order Number */}
        <h6 className='pb-3 uppercase text-h6 leading-h6 tracking-h6 font-bold'>
          order#{formatOrderId(order.orderId)}
        </h6>

        {/* Basic Order Summary */}
        <div className='pb-6 grid gap-y-4 grid-cols-1 md:grid-cols-3'>
          <div className='flex flex-col'>
            <p className='pb-1 uppercase text-h6 leading-h6 font-bold'>
              order placed
            </p>
            <p className='text-md'>{convertToSystemTime(order.createdAt)}</p>
          </div>
          <div className='flex flex-col'>
            <p className='pb-1 uppercase text-h6 leading-h6 font-bold'>total</p>
            <p className='text-md'>$ {order.grandTotal.toFixed(2)}</p>
          </div>
          <div className='flex justify-between'>
            <div className='flex flex-col'>
              <p className='pb-1 uppercase text-h6 leading-h6 font-bold'>
                status
              </p>
              <p className='uppercase text-md'>{order.status}</p>
            </div>
            <div>
              {isDetailsOpen ? (
                <MdKeyboardArrowUp
                  className='w-7 h-7 cursor-pointer'
                  onClick={toggleDetails}
                />
              ) : (
                <MdKeyboardArrowDown
                  className='w-7 h-7 cursor-pointer'
                  onClick={toggleDetails}
                />
              )}
            </div>
          </div>
        </div>

        {/* DETAILS */}
        {isDetailsOpen && (
          <>
            {/* Detailed Order Summary */}
            <div className='border-t-[1px] border-b-[1px] py-6 grid gap-y-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-0'>
              <div className='flex flex-col'>
                <p className='pb-1 uppercase text-h6 leading-h6 font-bold'>
                  shipping address
                </p>
                <p className='text-md'>{order.shippingAddress.attn}</p>
                <p className='address_street text-md'>
                  {order.shippingAddress.unit &&
                    `${order.shippingAddress.unit}, `}
                  {order.shippingAddress.street}
                </p>
                <p className='text-md'>
                  {order.shippingAddress.city}, {order.shippingAddress.state}
                </p>
                <p className='text-md'>{order.shippingAddress.country}</p>
                <p className='text-md'>{order.shippingAddress.postalCode}</p>
              </div>
              <div className='flex flex-col'>
                <p className='pb-1 uppercase text-h6 leading-h6 font-bold'>
                  payment method
                </p>
                <p className='capitalize text-md'>{order.paymentMethod}</p>
                <p className='text-md'>{order.cardNumber}</p>
              </div>
              <div className='flex flex-col'>
                <p className='pb-1 uppercase text-h6 leading-h6 font-bold'>
                  order summary
                </p>
                <div className='flex justify-between'>
                  <p className='uppercase text-md'>Item(s) subtotal:</p>
                  <p className='uppercase text-md'>
                    $ {order.subtotal.toFixed(2)}
                  </p>
                </div>
                <div className='flex justify-between'>
                  <p className='uppercase text-md'>Shipping:</p>
                  <p className='uppercase text-md'>
                    $ {order.shipping.toFixed(2)}
                  </p>
                </div>
                <div className='flex justify-between'>
                  <p className='uppercase text-md'>Tax:</p>
                  <p className='uppercase text-md'>$ {order.tax.toFixed(2)}</p>
                </div>
                <div className='flex justify-between'>
                  <p className='uppercase text-md font-bold'>Grand Total:</p>
                  <p className='uppercase text-md font-bold'>
                    $ {order.grandTotal.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <h6 className='pt-6 pb-3 text-h6 tracking-h6 leading-h6 font-bold'>
              Order Items
            </h6>
            <ul className='w-full pb-6 grid grid-cols-1 gap-y-4 md:grid-cols-2'>
              {order.items.map((item) => {
                return <OrderItem item={item} />;
              })}
            </ul>
          </>
        )}
      </div>
    </li>
  );
}
