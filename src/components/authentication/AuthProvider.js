import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { AuthWizardContext } from 'context/Context';
import { authReducer } from 'reducers/authReducer';

const AuthProvider = ({ children }) => {
  const initData = {
    user: {}
  };
  const [authState, authDispatch] = useReducer(authReducer, initData);

  const signIn = async data => {
    try {
      let authresult = await axios.post('/api/auth/login', data);
      let userObj = { ...authresult.data?.foundUser };
      userObj.token = authresult.data?.encodedToken;
      setUser(userObj);
      //toastsuccess('Login Successfull');
    } catch (err) {
      console.error(err);
      //toasterror('Login Failed');
    }
  };

  const signUp = async data => {
    try {
      let authresult = await axios.post('/api/auth/signup', data);
      let userObj = { ...authresult.data?.createdUser };
      userObj.token = authresult.data?.encodedToken;
      setUser(userObj);
      toastsuccess('Sign Up Successfull');
    } catch (err) {
      console.error(err);
      toasterror('An Error Occuered');
    }
  };

  const signOut = () => {
    setUser(null);
  };

  //로그인 여부
  const isLogin = !authState.user;
  return (
    <AuthWizardContext.Provider
      value={{
        authState,
        authDispatch,
        isLogin
      }}
    >
      {children}
    </AuthWizardContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthProvider;
