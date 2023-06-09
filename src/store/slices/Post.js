import { createSlice } from '@reduxjs/toolkit';
import { postData } from 'data/ecommerce/postData';

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

export const postSlice = createSlice({
  name: 'post',
  initialState: initData,
  reducers: {
    SORT_PRODUCT: (state, action) => {
      const payload = action.payload;
      state.post = [state.posts].sort((a, b) => {
        if (payload.sortBy === 'review') {
          if (payload.order === 'asc') {
            return a.reviews.length - b.reviews.length;
          } else {
            return b.reviews.length - a.reviews.length;
          }
        } else {
          if (payload.order === 'asc') {
            return a[payload.sortBy] - b[payload.sortBy];
          } else {
            return b[payload.sortBy] - a[payload.sortBy];
          }
        }
      });
    }
  }
});

export const { SORT_PRODUCT } = postSlice.actions;

export default postSlice.reducer;
