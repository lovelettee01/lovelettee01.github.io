import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postData } from 'data/ecommerce/postData';
import PostService from '../../apis/post.service';
import Log from '../../helpers/logger';

//포스트 목록조회
export const postList = createAsyncThunk(
  'post/postList',
  async (args, thunkAPI) => {
    try {
      if (thunkAPI.getState().auth.isLoggedIn) {
        const data = await PostService.postList(args);
        Log.debug('[Post] post/postList', data);
        return data;
      } else {
        const data = await PostService.postListPublic(args);
        Log.debug('[Post] post/postListPublic', data);
        return data;
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

//자신의 포스트 목록조회
export const postListSelf = createAsyncThunk(
  'post/postListSelf',
  async (args, thunkAPI) => {
    try {
      const data = await PostService.postListSelf(args);
      Log.debug('[Post] post/postListSelf', data);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const initData = {
  initPosts: postData,
  isLoading: true,
  posts: {
    pagination: {},
    data: []
  },
  filters: [],
  favouriteItems: []
};

export const postSlice = createSlice({
  name: 'post',
  initialState: initData,
  reducers: {
    SET_FILTER_OPTIONS: (state, action) => {
      state.filters = action.payload;
    }
  },
  extraReducers: builder => {
    /** 포스트 목록조회 **/
    // builder.addCase(postList.pending, state => {
    //   Log.debug('postList.pending', state);
    //   state.isLoading = true;
    // });
    builder.addCase(postList.fulfilled, (state, action) => {
      Log.debug('postList.fulfilled', state, action);
      state.posts = action.payload;
      state.isLoading = false;
    });
    builder.addCase(postListSelf.fulfilled, (state, action) => {
      Log.debug('postListSelf.fulfilled', state, action);
      state.posts = action.payload;
      state.isLoading = false;
    });
    // builder.addCase(postList.rejected, (state, action) => {
    //   Log.debug('postList.rejected', state, action);
    //   state.posts = {};
    //   state.isLoading = false;
    // });

    builder
      //Pending 설정
      .addMatcher(
        action =>
          action.type.startsWith('post') && action.type.endsWith('/pending'),

        state => {
          Log.debug('addMatcher Pending', state);
          state.isLoading = true;
        }
      )
      //Rejected 설정
      .addMatcher(
        action =>
          action.type.startsWith('post') && action.type.endsWith('/rejected'),
        state => {
          Log.debug('addMatcher rejected', state);
          state.posts = {};
          state.isLoading = false;
        }
      );
  }
});

export const { SET_FILTER_OPTIONS } = postSlice.actions;

export default postSlice.reducer;
