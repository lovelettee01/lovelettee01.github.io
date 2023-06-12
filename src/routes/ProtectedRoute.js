import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { authCheck } from '../store/slices/Auth';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ redirectPath = '/signin', children }) => {
  const [isAllow, setIsAllow] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authCheck()).then(response => {
      console.log('ProtectedRoute authCheck', response);
      const { data } = response.payload;
      setIsAllow(data.success);
    });
  }, [dispatch]);

  console.log(`isAllow : ${isAllow}`);
  if (isAllow !== null) {
    if (!isAllow) return <Navigate to={redirectPath} replace />;
    return children ? children : <Outlet />;
  }
};

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  redirectPath: PropTypes.string,
  children: PropTypes.node
};
