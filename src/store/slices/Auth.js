import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authenticated: false
  },
  reducers: {
    Success: state => {
      state.authenticated = true;
    },
    Fail: state => {
      state.authenticated = false;
    }
  }
});

export const { Success, Fail } = authSlice.actions;

export default authSlice.reducer;
