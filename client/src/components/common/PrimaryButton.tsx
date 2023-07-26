import React from 'react';
import ButtonLoader from './ButtonLoader';

interface PrimaryButtonProps {
  text: string;
  isDisabled?: boolean;
  showLoadingWhenDisabled?: boolean;
  fullSize?: boolean;
  onButtonClick?: (e?: React.MouseEvent<HTMLElement>) => void;
}

const PrimaryButton = ({
  text,
  onButtonClick,
  fullSize = false,
  isDisabled = false,
  showLoadingWhenDisabled = false,
}: PrimaryButtonProps) => {
  const buttonClicked = (e?: React.MouseEvent<HTMLElement>) => {
    if (onButtonClick) {
      onButtonClick(e);
    }
  };

  const getSize = () => {
    return fullSize ? 'w-full' : 'w-button';
  };

  return (
    <button
      className={`relative ${getSize()} h-button uppercase text-white text-sm font-bold tracking-sm bg-darkOrange hover:bg-mainOrange`}
      disabled={isDisabled}
      onClick={buttonClicked}
    >
      {(isDisabled && showLoadingWhenDisabled) || text}
      {isDisabled && showLoadingWhenDisabled && <ButtonLoader />}
    </button>
  );
};

export default PrimaryButton;
