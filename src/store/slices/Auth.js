import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthService, { removeAccessToken } from 'apis/auth.service';
import { userProfile } from './User';
import Log from 'helpers/logger';

//회원가입
export const signUp = createAsyncThunk(
  'auth/signup',
  async (args, thunkAPI) => {
    try {
      const data = await AuthService.signUp(args);
      Log.debug('[Auth] auth/signup', data);
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
      Log.debug('[Auth] auth/signIn', data);
      if (data.success) {
        await thunkAPI.dispatch(userProfile()); //User Profile Dispath 호출
      }
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

//로그아웃
export const signOut = createAsyncThunk('auth/signout', async (_, thunkAPI) => {
  try {
    const data = await AuthService.signOut();
    Log.debug('[Auth] auth/signout', data);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

//로그인 상태체크
export const authCheck = createAsyncThunk('auth/check', async (_, thunkAPI) => {
  try {
    const data = await AuthService.authCheck();
    Log.debug('[Auth] auth/check', data);
    if (data.success) {
      //유저정보가 없는경우 새로 호출
      if (!thunkAPI.getState().user.currentUser)
        await thunkAPI.dispatch(userProfile()); //User Profile Dispath 호출
    }
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

//비밀번호 변경
export const passwordChange = createAsyncThunk(
  'auth/passwordChange',
  async (args, thunkAPI) => {
    try {
      const data = await AuthService.passwordChange(args);
      Log.debug('[Auth] auth/passwordChange', data);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

//비밀번호 변경 E-mail 전송 & 토큰 발급
export const passwordResetToken = createAsyncThunk(
  'auth/passwordResetToken',
  async (args, thunkAPI) => {
    try {
      const data = await AuthService.passwordResetToken(args);
      Log.debug('[Auth] auth/passwordResetToken', data);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

//Token을 통한 새로운 비밀번호 설정
export const passwordReset = createAsyncThunk(
  'auth/passwordReset',
  async (args, thunkAPI) => {
    try {
      const data = await AuthService.passwordReset(args);
      Log.debug('[Auth] auth/passwordReset', data);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

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
    /** 회원가입 **/
    [signUp.fulfilled]: (state, action) => {
      Log.debug('signUp.fulfilled', state, action);
      state.isLoggedIn = false;
    },
    [signUp.rejected]: (state, action) => {
      Log.debug('signUp.rejected', state, action);
      state.isLoggedIn = false;
    },
    /** 로그인 **/
    [signIn.fulfilled]: (state, action) => {
      Log.debug('signIn.fulfilled', state, action);
      state.isLoggedIn = true;
    },
    [signIn.rejected]: (state, action) => {
      Log.debug('signIn.rejected', state, action);
      state.isLoggedIn = false;
    },
    /** 로그아웃 **/
    [signOut.fulfilled]: (state, action) => {
      Log.debug('signOut.fulfilled', state, action);
      state.isLoggedIn = false;
    },
    /** 상태체크 **/
    [authCheck.fulfilled]: (state, action) => {
      Log.debug('authCheck.fulfilled', state, action);
      state.isLoggedIn = true;
    },
    [authCheck.rejected]: (state, action) => {
      Log.debug('authCheck.rejected', state, action);
      state.isLoggedIn = false;
      removeAccessToken(true); //기존 Store 삭제
    },
    /** 비밀번호 변경 **/
    [passwordChange.fulfilled]: (state, action) => {
      Log.debug('passwordChange.fulfilled', state, action);
    },
    [passwordChange.rejected]: (state, action) => {
      Log.debug('passwordChange.rejected', state, action);
    },
    /** 비밀번호 변경 토큰생성 **/
    [passwordResetToken.fulfilled]: (state, action) => {
      Log.debug('passwordResetToken.fulfilled', state, action);
    },
    [passwordResetToken.rejected]: (state, action) => {
      Log.debug('passwordResetToken.rejected', state, action);
    },
    /** 새로운 비밀번호 변경 **/
    [passwordReset.fulfilled]: (state, action) => {
      Log.debug('passwordReset.fulfilled', state, action);
    },
    [passwordReset.rejected]: (state, action) => {
      Log.debug('passwordReset.rejected', state, action);
    }
  }
});

export const { LoginSuccess, LoginFail } = authSlice.actions;

export default authSlice.reducer;
