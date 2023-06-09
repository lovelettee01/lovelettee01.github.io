import { createSlice } from '@reduxjs/toolkit';
import { settings } from 'config';
import {
  getItemFromStore,
  setItemToStore,
  clearItemStore
} from 'helpers/utils';

const configState = {
  isFluid: getItemFromStore('isFluid', settings.isFluid),
  isRTL: getItemFromStore('isRTL', settings.isRTL),
  isDark: getItemFromStore('isDark', settings.isDark),
  navbarPosition: getItemFromStore('navbarPosition', settings.navbarPosition),
  disabledNavbarPosition: [],
  isNavbarVerticalCollapsed: getItemFromStore(
    'isNavbarVerticalCollapsed',
    settings.isNavbarVerticalCollapsed
  ),
  navbarStyle: getItemFromStore('navbarStyle', settings.navbarStyle),
  currency: settings.currency,
  showBurgerMenu: settings.showBurgerMenu,
  showSettingPanel: false,
  navbarCollapsed: false
};

export const configSlice = createSlice({
  name: 'config',
  initialState: configState,
  reducers: {
    SET_CONFIG: (state, action) => {
      let payload = action.payload;
      const isInStore = [
        'isFluid',
        'isRTL',
        'isDark',
        'navbarPosition',
        'isNavbarVerticalCollapsed',
        'navbarStyle'
      ].includes(payload.key);
      if (isInStore) {
        setItemToStore(payload.key, payload.value);
      }
      state[payload.key] = payload.value;
    },
    REFRESH: state => {
      return { ...state };
    },
    RESET: state => {
      clearItemStore();
      return { ...state, ...settings };
    }
  }
});

export const { SET_CONFIG, REFRESH, RESET } = configSlice.actions;

export default configSlice.reducer;
