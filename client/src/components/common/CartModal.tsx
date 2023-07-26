import CartModalItem from './CartModalItem';
import PrimaryButton from './PrimaryButton';
import PricingRow from './PricingRow';
import { calculateTotalAmount } from '../../utils/checkoutAmountHelper';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { closeAllModals } from '../../features/modal/modalSlice';
import EmptyCart from './EmptyCart';
import { updateCart } from '../../features/user/userSlice';
import { Cart } from '../../utils/interface';
import { TOAST_MESSAGE_TYPE, toastMessage } from '../../utils/toastHelper';

export default function CartModal() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { cart } = useSelector((state: RootState) => state.user);

  const goToCheckoutPage = () => {
    dispatch(closeAllModals());
    navigate('/checkout');
  };

  const removeAll = () => {
    if (cart) {
      let newCart: Cart = {
        _id: cart._id,
        items: [],
        createdAt: cart.createdAt,
      };
      try {
        dispatch(updateCart(newCart)).unwrap();
      } catch (error: any) {
        console.log('remove all cart items:', error);
        toastMessage(error.msg, TOAST_MESSAGE_TYPE.ERROR);
      }
    }
  };

  return (
    <aside className='w-mainContentMobile px-7 py-8 bg-white rounded-lg flex flex-col space-y-8 md:w-cartModal md:px-8'>
      <div className='flex justify-between items-center'>
        <h6 className='uppercase text-h6 tracking-h6 font-bold'>
          cart ({cart?.items.length})
        </h6>
        {cart && cart.items.length > 0 && (
          <button
            className='underline w-max h-max text-lg tracking-lg opacity-50'
            onClick={removeAll}
          >
            Remove all
          </button>
        )}
      </div>

      {cart && cart.items.length > 0 ? (
        <>
          <ul className='flex flex-col space-y-6'>
            {cart.items.map((cartItem) => {
              return (
                <CartModalItem key={cartItem.productId} cartItem={cartItem} />
              );
            })}
          </ul>
          <div className='flex flex-col space-y-6'>
            <PricingRow
              title='total'
              amount={calculateTotalAmount(cart.items)}
            />
            <PrimaryButton
              text='checkout'
              fullSize={true}
              onButtonClick={goToCheckoutPage}
            />
          </div>
        </>
      ) : (
        <EmptyCart />
      )}
    </aside>
  );
}
