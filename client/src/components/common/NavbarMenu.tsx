interface Props {
  onMenuClick?: () => void;
}

export default function NavbarMenu({ onMenuClick }: Props) {
  const menuClicked = () => {
    if (onMenuClick) {
      onMenuClick();
    }
  };

  return (
    <img
      className='block lg:hidden'
      src='/assets/shared/tablet/icon-hamburger.svg'
      alt=''
      onClick={menuClicked}
    />
  );
}
