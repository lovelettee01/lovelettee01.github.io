import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { PostContext } from 'context/Context';
import { postData } from 'data/ecommerce/postData';
import { postReducer } from 'reducers/postReducer';

const PostProvider = ({ children }) => {
  const initData = {
    initPosts: postData,
    posts: postData,
    cartItems: [
      {
        ...postData[0],
        quantity: 3,
        totalPrice: postData[0].price * 3
      },
      {
        ...postData[1],
        quantity: 3,
        totalPrice: postData[1].price * 3
      },
      { ...postData[2], quantity: 3, totalPrice: postData[2].price * 3 }
    ],
    promo: null,
    favouriteItems: [],
    cartModal: {
      show: false,
      post: {},
      quantity: 0,
      type: 'add'
    }
  };
  const [postsState, postsDispatch] = useReducer(postReducer, initData);

  const isInShoppingCart = id =>
    !!postsState.cartItems.find(cartItem => cartItem.id === id);
  const isInFavouriteItems = id =>
    !!postsState.favouriteItems.find(favouriteItem => favouriteItem.id === id);

  return (
    <PostContext.Provider
      value={{
        postsState,
        postsDispatch,
        isInShoppingCart,
        isInFavouriteItems
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

PostProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default PostProvider;
