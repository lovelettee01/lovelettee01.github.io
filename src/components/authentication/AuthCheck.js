import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { authCheck, LoginSuccess, LoginFail } from '../../store/slices/Auth';

import moment from 'moment';
import { getItemFromStore } from 'helpers/utils';

export function AuthHealthCheck({ isHealthCheck = true, key }) {
  const [isAuth, setIsAuth] = useState('Loading');
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(`AuthHealthCheck : ${isAuth}`);
    const checkAuthToken = async () => {
      if (isHealthCheck) {
        dispatch(authCheck()).then(response => {
          const { data } = response.payload;
          console.log('ProtectedRoute authCheck', data);
          if (data?.success) {
            setIsAuth('Success');
            dispatch(LoginSuccess());
          } else {
            setIsAuth('Failed');
            dispatch(LoginFail());
          }
        });
      } else {
        const accessToken = getItemFromStore('accessToken');
        const expiredToken = getItemFromStore('expiredToken');
        if (accessToken && moment(expiredToken).diff(moment()) >= 0) {
          setIsAuth('Success');
          dispatch(LoginSuccess());
        } else {
          setIsAuth('Failed');
          dispatch(LoginFail());
        }
      }
    };
    checkAuthToken();
  }, [dispatch, key]);
  return {
    isAuth
  };
}
