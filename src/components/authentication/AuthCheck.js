import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { authCheck } from '../../store/slices/Auth';

export function AuthHealthCheck(key) {
  const [isAuth, setIsAuth] = useState('Loading');
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthToken = async () => {
      console.log(`isAuth : ${isAuth}`);
      dispatch(authCheck()).then(response => {
        console.log('ProtectedRoute authCheck', response);
        const { data } = response.payload;
        if (data?.success) {
          setIsAuth('Success');
        } else {
          setIsAuth('Failed');
        }
      });
    };
    checkAuthToken();
  }, [dispatch, key]);

  return {
    isAuth
  };
}
