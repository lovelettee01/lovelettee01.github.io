/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-case-declarations */

export const companyReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SORT_COURSE':
      return {
        ...state,
        companys: [...state.primaryCompanys].sort((a, b) => {
          if (payload.order === 'asc') {
            return a[payload.sortBy] - b[payload.sortBy];
          } else {
            return b[payload.sortBy] - a[payload.sortBy];
          }
        })
      };
    case 'SEARCH_COURSE':
      const searchedCompanys = [...state.primaryCompanys].filter(company =>
        company.name.toUpperCase().includes(payload.searchedText.toUpperCase())
      );
      return {
        ...state,
        companys: searchedCompanys
      };
    case 'ADD_TO_CART':
      return {
        ...state,
        cartItems: [...state.cartItems, payload.company]
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter(
          company => company.id !== payload.company.id
        )
      };
    case 'ADD_TO_FAVOURITES':
      return {
        ...state,
        companys: state.companys.map(company =>
          company.id === payload.company.id
            ? { ...company, favorite: company.favorite + 1 }
            : company
        ),
        favouriteItems: [...state.favouriteItems, payload.company]
      };
    case 'REMOVE_FROM_FAVOURITES':
      return {
        ...state,
        companys: state.companys.map(company =>
          company.id === payload.company.id
            ? { ...company, favorite: company.favorite - 1 }
            : company
        ),
        favouriteItems: state.favouriteItems.filter(
          company => company.id !== payload.company.id
        )
      };
    default:
      return state;
  }
};
