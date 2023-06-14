import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthService from 'apis/auth.service';
import { userProfile } from './User';
import Log from 'helpers/logger';

//회원가입
export const signUp = createAsyncThunk(
  'auth/signup',
  async (args, thunkAPI) => {
    try {
      const data = await AuthService.signUp(args);
      Log.debug('auth/signup', data);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

//로그인
export const signIn = createAsyncThunk(
  'auth/signin',
  async (args, thunkAPI) => {
    try {
      const data = await AuthService.signIn(args);
      Log.debug('auth/signIn', data);
      if (data.success) {
        thunkAPI.dispatch(userProfile()); //User Profile Dispath 호출
      }
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

//로그아웃
export const signOut = createAsyncThunk(
  'auth/signout',
  async (args, thunkAPI) => {
    try {
      const data = await AuthService.signOut(args);
      Log.debug('auth/signout', data);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

//로그인 상태체크
export const authCheck = createAsyncThunk('auth/check', async (_, thunkAPI) => {
  try {
    const data = await AuthService.authCheck();
    Log.debug('auth/check', data);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

const initialState = { isLoggedIn: false };

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    LoginSuccess: state => {
      state.isLoggedIn = true;
    },
    LoginFail: state => {
      state.isLoggedIn = false;
    }
  },
  extraReducers: {
    [signUp.fulfilled]: (state, action) => {
      Log.debug('signUp.fulfilled', state, action);
      state.isLoggedIn = false;
    },
    [signUp.rejected]: (state, action) => {
      Log.debug('signUp.rejected', state, action);
      state.isLoggedIn = false;
    },
    [signIn.fulfilled]: (state, action) => {
      Log.debug('signIn.fulfilled', state, action);
      state.isLoggedIn = true;
    },
    [signIn.rejected]: (state, action) => {
      Log.debug('signIn.rejected', state, action);
      state.isLoggedIn = false;
    },
    [signOut.fulfilled]: (state, action) => {
      Log.debug('signOut.fulfilled', state, action);
      state.isLoggedIn = false;
    }
  }
});

export const { LoginSuccess, LoginFail } = authSlice.actions;

export default authSlice.reducer;
