import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  componentName: null,
  isOpen: false,
  childrenProps: {},
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.componentName = action.payload.componentName;
      state.isOpen = true;
      state.childrenProps = action.payload.childrenProps;
    },
    closeModal: (state, action) => {
      state.componentName = null;
      state.isOpen = false;
      state.childrenProps = {};
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
