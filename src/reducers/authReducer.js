import { setItemToStore } from 'helpers/utils';
import { AUTH_ACTIONS } from 'constance/IConstance';

export const authReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case AUTH_ACTIONS.LOGIN:
      if (payload.setInStore) {
        setItemToStore(payload.key, payload.value);
      }
      return {
        ...state,
        [payload.key]: payload.value
      };
    default:
      return state;
  }
};
