import React from 'react';

interface TertiaryButtonProps {
  text: string;
  onButtonClick?: () => void;
  left?: boolean;
}

const TertiaryButton = ({
  text,
  onButtonClick,
  left = false,
}: TertiaryButtonProps) => {
  const buttonClicked = () => {
    if (onButtonClick) {
      onButtonClick();
    }
  };

  return (
    <div className='w-max flex justify-center items-center'>
      {left && (
        <img
          className='w-arrow h-arrow mr-3 rotate-180'
          src='/assets/shared/desktop/icon-arrow-right.svg'
          alt=''
        />
      )}
      <p
        className='uppercase text-black text-sm leading-sm tracking-sm pr-3 cursor-pointer hover:text-darkOrange'
        onClick={buttonClicked}
      >
        {text}
      </p>
      {!left && (
        <img
          className='w-arrow h-arrow'
          src='/assets/shared/desktop/icon-arrow-right.svg'
          alt=''
        />
      )}
    </div>
  );
};

export default TertiaryButton;
