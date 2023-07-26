import { createSlice } from '@reduxjs/toolkit';

export interface ModalSliceStates {
  canClickShadeToCloseModal: boolean;
  isHeaderMenuOpen: boolean;
  isCartOpen: boolean;
  isOrderCompleteOpen: boolean;
}

const initialState: ModalSliceStates = {
  canClickShadeToCloseModal: true,
  isHeaderMenuOpen: false,
  isCartOpen: false,
  isOrderCompleteOpen: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleHeaderMenu: (state) => {
      return { ...state, isHeaderMenuOpen: !state.isHeaderMenuOpen };
    },
    toggleCart: (state) => {
      return { ...state, isCartOpen: !state.isCartOpen };
    },
    toggleOrderComplete: (state) => {
      let temp = { ...state };
      //disable clicking the shade to close the order complete modal
      if (!state.isOrderCompleteOpen) {
        temp.canClickShadeToCloseModal = false;
      } else {
        temp.canClickShadeToCloseModal = true;
      }
      return { ...temp, isOrderCompleteOpen: !state.isOrderCompleteOpen };
    },
    closeAllModals: (state) => {
      return initialState;
    },
  },
});

export const {
  toggleHeaderMenu,
  toggleCart,
  toggleOrderComplete,
  closeAllModals,
} = modalSlice.actions;
export default modalSlice.reducer;
