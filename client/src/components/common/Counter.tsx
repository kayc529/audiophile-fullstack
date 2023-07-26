import { useEffect } from 'react';

interface Props {
  count: number;
  onCountChanged?: (count: number) => void;
  forCart?: boolean;
}

const Counter = ({ count, onCountChanged, forCart = false }: Props) => {
  useEffect(() => {
    if (onCountChanged) {
      onCountChanged(count);
    }
  }, [count, onCountChanged]);

  const increaseCount = () => {
    if (onCountChanged) {
      onCountChanged(count + 1);
    }
  };

  const decreaseCount = () => {
    let newCount = count >= 1 ? count - 1 : 0;
    if (onCountChanged) {
      onCountChanged(newCount);
    }
  };

  return (
    <div
      className={`${
        forCart ? 'w-counter h-counter' : 'w-button h-button'
      } px-2 bg-mainGrey flex items-center justify-between`}
    >
      <p
        className='w-4 h-4 text-sm text-center text-grey font-bold cursor-pointer opacity-30 select-none hover:text-darkOrange hover:opacity-100'
        onClick={decreaseCount}
      >
        -
      </p>
      <p className='h-4 text-sm font-bold select-none'>{count}</p>
      <p
        className='w-4 h-4 text-sm text-center text-grey font-bold cursor-pointer opacity-30 select-none hover:text-darkOrange hover:opacity-100'
        onClick={increaseCount}
      >
        +
      </p>
    </div>
  );
};

export default Counter;
