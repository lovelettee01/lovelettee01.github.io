import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import UserService from 'apis/user.service';
import Log from 'helpers/logger';

//회원정보확인
export const userProfile = createAsyncThunk(
  'user/profile',
  async (_, thunkAPI) => {
    try {
      const data = await UserService.getUserProfile();
      Log.debug('user/profile', data);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

//회원정보수정
export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (_, thunkAPI) => {
    try {
      const data = await UserService.updateUserProfile();
      Log.debug('user/updateProfile', data);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const initialState = { currentUser: null };
export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.currentUser = action.payload.data;
    }
  },
  extraReducers: {
    [userProfile.fulfilled]: (state, action) => {
      Log.debug('userProfile.fulfilled', state, action);
      state.currentUser = action.payload.data;
    },
    [userProfile.rejected]: (state, action) => {
      Log.debug('userProfile.rejected', state, action);
      state.currentUser = null;
    },
    [updateProfile.fulfilled]: (state, action) => {
      Log.debug('updateProfile.fulfilled', state, action);
      //state.currentUser = action.payload.data;
    },
    [updateProfile.rejected]: (state, action) => {
      Log.debug('updateProfile.rejected', state, action);
      // state.currentUser = null;
    }
  }
});

export const { setUserProfile } = userSlice.actions;

export default userSlice.reducer;
