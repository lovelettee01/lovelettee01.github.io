import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      return { isError: false, message: action.payload };
    },
    setErrorMessage: (state, action) => {
      return { isError: true, message: action.payload };
    },
    clearMessage: () => {
      return { isError: false, message: '' };
    }
  }
});

const { reducer, actions } = messageSlice;

export const { setMessage, setErrorMessage, clearMessage } = actions;
export default reducer;
