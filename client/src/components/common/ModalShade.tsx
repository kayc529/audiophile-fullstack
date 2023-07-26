import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { closeAllModals } from '../../features/modal/modalSlice';
import { useModalState } from '../../hooks/useModalState';

export default function ModalShade() {
  const dispatch: AppDispatch = useDispatch();
  const isModalOpen = useModalState();
  const { canClickShadeToCloseModal } = useSelector(
    (state: RootState) => state.modal
  );

  const closeModal = () => {
    if (canClickShadeToCloseModal) {
      dispatch(closeAllModals());
    }
  };

  return isModalOpen ? (
    <div
      className='z-modalBg --modal-shade fixed w-full h-full bg-modalShade'
      onClick={closeModal}
    ></div>
  ) : (
    <></>
  );
}
