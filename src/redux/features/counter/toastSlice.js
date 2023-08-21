import { createSlice } from '@reduxjs/toolkit';

const initialToastState = {
  message: null,
};

const toastSlice = createSlice({
  name: 'toast',
  initialState: initialToastState,
  reducers: {
    showToast(state, action) {
      state.message = action.payload;
    },
    clearToast(state) {
      state.message = null;
    },
  },
});

export const { showToast, clearToast } = toastSlice.actions;
export default toastSlice.reducer;