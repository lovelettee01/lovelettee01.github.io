import { createSlice } from '@reduxjs/toolkit';
import { companyData } from 'data/elearning/companyData';

const initData = {
  initCompanys: companyData,
  companys: companyData,
  primaryCompanys: companyData,
  cartItems: [{ ...companyData[1] }, { ...companyData[2] }],
  favouriteItems: []
};

export const companySlice = createSlice({
  name: 'company',
  initialState: initData,
  reducers: {
    SORT_COURSE: state => {
      state.authenticated = true;
    },
    SEARCH_COURSE: state => {
      state.authenticated = false;
    }
  }
});

export const { SORT_COURSE, SEARCH_COURSE } = companySlice.actions;

export default companySlice.reducer;
