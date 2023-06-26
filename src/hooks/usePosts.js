import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postList, SET_FILTER_OPTIONS } from 'store/slices/Post';
import { mergeObject } from '../helpers/utils';

const usePosts = () => {
  const [isAsc, setIsAsc] = useState(true);
  const [sortBy, setSortBy] = useState('updatedAt');

  const loading = useSelector(state => state.post.isLoading);
  const filters = useSelector(state => state.post.filters);

  const dispatch = useDispatch();
  const handleSearch = searchedText => {
    setIsAsc(true);
    search({ searchedText });
  };

  const handleSortByChange = sortValue => {
    setSortBy(sortValue);
    setIsAsc(true);
    search({ orderBy: sortValue });
  };

  const handleIsAscClick = isAsc => {
    setIsAsc(isAsc);
    search({ orderRule: isAsc ? 'asc' : 'desc' });
  };

  const handleFilterSearch = filters => {
    dispatch(SET_FILTER_OPTIONS(filters));
    search(filterParams(filters));
  };

  const search = (params = {}) => {
    //정렬조건
    params = mergeObject(
      {
        orderBy: sortBy,
        orderRule: 'asc'
      },
      params
    );

    //필터조건
    params = mergeObject(filterParams(filters), params);
    dispatch(postList(params));
  };

  const filterParams = filters => {
    const params = {};
    //필터조건
    if (!!filters && filters.length > 0) {
      filters.map(filter => {
        params[filter.name] = filter.value == 'true' || filter.value;
      });
    }
    return params;
  };

  return {
    handleSearch,
    handleIsAscClick,
    handleSortByChange,
    handleFilterSearch,
    loading,
    isAsc
  };
};

export default usePosts;
