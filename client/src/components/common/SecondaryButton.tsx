import React from 'react';

interface SecondaryButtonProps {
  text: string;
  darkMode?: boolean;
  fullSize?: boolean;
  onButtonClick?: (e?: React.MouseEvent<HTMLElement>) => void;
  isDisabled?: boolean;
}
const SecondaryButton = ({
  text,
  onButtonClick,
  darkMode = false,
  fullSize = false,
  isDisabled = false,
}: SecondaryButtonProps) => {
  const getColor = () => {
    return darkMode
      ? 'bg-black text-white hover:bg-ashBlack'
      : 'bg-transparent text-black border border-black hover:bg-black hover:text-white';
  };

  const getSize = () => {
    return fullSize ? 'w-full' : 'w-button';
  };

  const buttonClicked = (e: React.MouseEvent<HTMLElement>) => {
    if (onButtonClick) {
      onButtonClick(e);
    }
  };

  return (
    <button
      className={`${getSize()} h-button uppercase text-sm font-bold ${getColor()}`}
      onClick={buttonClicked}
    >
      {text}
    </button>
  );
};

export default SecondaryButton;
