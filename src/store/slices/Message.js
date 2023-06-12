import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isError: false,
  message: ''
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.isError = false;
      state.message = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.isError = true;
      state.message = action.payload;
    },
    clearMessage: state => {
      state.isError = false;
      state.message = '';
    }
  }
});

const { reducer, actions } = messageSlice;

export const { setMessage, setErrorMessage, clearMessage } = actions;
export default reducer;
