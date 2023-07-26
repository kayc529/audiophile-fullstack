import React, { useEffect } from 'react';
import { useWindowSize } from '../../hooks/useWindowSize';
import { SCREENSIZE } from '../../utils/constants';

interface Props {
  show?: boolean;
  hideLg?: boolean;
  hideMd?: boolean;
  hideSm?: boolean;
  centerDialog?: boolean;
  children?: JSX.Element[] | JSX.Element;
  onClose?: () => void;
}

export default function ModalContainer({
  show = false,
  hideLg = false,
  hideMd = false,
  hideSm = false,
  centerDialog = false,
  onClose,
  children,
}: Props) {
  const [width] = useWindowSize();

  useEffect(() => {
    if (show) {
      if (width < SCREENSIZE.MD) {
        hideMainBodyScrollbar();
      } else if (width >= SCREENSIZE.MD) {
        showMainBodyScrollbar();
        if (width > SCREENSIZE.LG && onClose) {
          onClose();
        }
      }
    } else {
      showMainBodyScrollbar();
    }
  }, [width, show, onClose]);

  const getVisibility = () => {
    let visibility = '';
    visibility += hideSm ? 'hidden ' : 'fixed ';
    visibility += hideMd ? 'md:hidden ' : 'md:fixed ';
    visibility += hideLg ? 'lg:hidden ' : 'lg:fixed ';
    return visibility;
  };

  const hideMainBodyScrollbar = () => {
    console.log('hideMainBodyScrollbar');
    let scrollBarWidth = window.innerWidth - document.body.offsetWidth;
    document.body.style.marginRight = `${scrollBarWidth}px`;
    document.body.style.overflow = 'hidden';
  };

  const showMainBodyScrollbar = () => {
    console.log('showMainBodyScrollbar');
    let scrollBarWidth = window.innerWidth - document.body.offsetWidth;
    document.body.style.marginRight = `-${scrollBarWidth}px`;
    document.body.style.overflow = 'auto';
  };

  const shadedClicked = (e: React.MouseEvent<HTMLElement>) => {
    if (onClose) {
      onClose();
    }
  };

  return show ? (
    <aside
      id='modal-container'
      className={`${getVisibility()} z-modalBg w-screen h-screen`}
    >
      {/* Container to enable scrolling when the height of the dialog is greater than the window height*/}
      <div className='fixed w-full h-full overflow-y-auto'>
        {/* Container of the dialog + shade*/}
        <div id='modal-dialog' className='w-full h-full flex flex-col'>
          {/* Children must be place inside a div so that its z-index is higher than the shade */}
          <div
            className={`${
              centerDialog ? 'm-auto' : ''
            } z-modalDialog w-full h-max`}
          >
            {children}
          </div>
          {/* Shade - z-layered below the dialog */}
          <div
            id='modal-shade'
            className='absolute top-0 left-0 w-full h-full bg-modalShade'
            onClick={shadedClicked}
          ></div>
        </div>
      </div>
    </aside>
  ) : (
    <></>
  );
}
