import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface Props {
  onCartClicked?: () => void;
}

export default function Cart({ onCartClicked }: Props) {
  const { cart } = useSelector((state: RootState) => state.user);

  const cartClicked = () => {
    if (onCartClicked) {
      onCartClicked();
    }
  };

  return (
    <div
      className='relative flex justify-end cursor-pointer'
      onClick={cartClicked}
    >
      {cart && cart.items.length > 0 && (
        <div className='absolute -top-3 -right-3 w-5 h-5 bg-darkOrange rounded-full flex justify-center items-center'>
          <p className='text-xs text-white'>{cart.items.length}</p>
        </div>
      )}

      <img
        className='w-auto h-6'
        src='/assets/shared/desktop/icon-cart.svg'
        alt='cart'
      />
    </div>
  );
}
