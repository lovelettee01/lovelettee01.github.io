import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthService from 'apis/auth.service';
import UserService from 'apis/user.service';
import { setMessage, setErrorMessage } from './Message';

//회원가입
export const signUp = createAsyncThunk(
  'auth/signup',
  async (args, thunkAPI) => {
    try {
      const data = await AuthService.signUp(args);
      console.log('auth/signup', data);
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
      console.log('auth/signIn', data);
      if (data.success) {
        const userData = await UserService.getUserProfile();
        console.log('user/profile', userData);
        if (userData.success) {
          data['user'] = userData.data;
          thunkAPI.dispatch(
            setMessage(data.message || '정상적으로 로그인 되었습니다.')
          );
        } else {
          thunkAPI.dispatch(
            setErrorMessage(data.message || '[Profile] 오류가 발생하였습니다.')
          );
        }
      } else {
        thunkAPI.dispatch(
          setErrorMessage(data.message || '[SignIn] 오류가 발생하였습니다.')
        );
      }
      return data;
    } catch (err) {
      thunkAPI.dispatch(
        setErrorMessage(err || '[Exception] 오류가 발생하였습니다.')
      );
      return thunkAPI.rejectWithValue(err);
    }
  }
);

//로그아웃
export const signOut = createAsyncThunk(
  'auth/signout',
  async (args, thunkAPI) => {
    try {
      const data = await AuthService.signout(args);
      console.log('auth/signout', data);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const user = null;
const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  extraReducers: {
    [signUp.fulfilled]: (state, action) => {
      console.log('signUp.fulfilled', state, action);
      state.isLoggedIn = false;
    },
    [signUp.rejected]: (state, action) => {
      console.log('signUp.rejected', state, action);
      state.isLoggedIn = false;
    },
    [signIn.fulfilled]: (state, action) => {
      console.log('signIn.fulfilled', state, action);
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [signIn.rejected]: (state, action) => {
      console.log('signIn.rejected', state, action);
      state.isLoggedIn = false;
      state.user = null;
    },
    [signOut.fulfilled]: (state, action) => {
      console.log('signOut.fulfilled', state, action);
      state.isLoggedIn = false;
      state.user = null;
    }
  }
});

//export const { LoginSuccess, LoginFail } = authSlice.actions;

export default authSlice.reducer;
