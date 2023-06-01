import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { CompanyContext } from 'context/Context';
import { companyData } from 'data/elearning/companyData';
import { companyReducer } from 'reducers/companyReducer';

const CompanyProvider = ({ children }) => {
  const initData = {
    initCompanys: companyData,
    companys: companyData,
    primaryCompanys: companyData,
    cartItems: [{ ...companyData[1] }, { ...companyData[2] }],
    favouriteItems: []
  };
  const [companysState, companysDispatch] = useReducer(
    companyReducer,
    initData
  );

  const isInCart = id =>
    !!companysState.cartItems.find(cartItem => cartItem.id === id);
  const isInFavouriteItems = id =>
    !!companysState.favouriteItems.find(
      favouriteItem => favouriteItem.id === id
    );

  return (
    <CompanyContext.Provider
      value={{
        companysState,
        companysDispatch,
        isInCart,
        isInFavouriteItems
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

CompanyProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default CompanyProvider;
