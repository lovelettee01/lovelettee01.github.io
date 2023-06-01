import { useContext, useState } from 'react';
import { CompanyContext } from 'context/Context';

const useCompanys = company => {
  const [isAsc, setIsAsc] = useState(true);
  const [sortBy, setSortBy] = useState('price');

  const {
    companysDispatch: companysDispatch,
    isInCart,
    isInFavouriteItems
  } = useContext(CompanyContext);

  const handleSearch = searchedText => {
    companysDispatch({
      type: 'SEARCH_COURSE',
      payload: {
        searchedText
      }
    });
  };

  const handleSort = () => {
    companysDispatch({
      type: 'SORT_COURSE',
      payload: {
        sortBy,
        order: isAsc ? 'asc' : 'desc'
      }
    });
  };

  const handleSortByChange = sortValue => {
    setSortBy(sortValue);
    setIsAsc(true);

    handleSort();
  };

  const handleIsAscClick = isAsc => {
    setIsAsc(isAsc);

    handleSort();
  };

  const handleAddToCart = () => {
    companysDispatch({
      type: isInCart(company.id) ? 'REMOVE_FROM_CART' : 'ADD_TO_CART',
      payload: { company }
    });
  };

  const handleFavouriteClick = () => {
    companysDispatch({
      type: isInFavouriteItems(company.id)
        ? 'REMOVE_FROM_FAVOURITES'
        : 'ADD_TO_FAVOURITES',
      payload: { company }
    });
  };

  return {
    handleAddToCart,
    handleFavouriteClick,
    handleSearch,
    handleIsAscClick,
    handleSortByChange,
    isAsc
  };
};

export default useCompanys;
