import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthService, { clearAllAccessData } from 'apis/auth.service';
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
        const userData = await thunkAPI.dispatch(userProfile()); //User Profile Dispath 호출
        const result = userData.payload;
        if (!result.succes) return thunkAPI.rejectWithValue(result);
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
      if (!thunkAPI.getState().user.currentUser) {
        const userData = await thunkAPI.dispatch(userProfile()); //User Profile Dispath 호출
        const result = userData.payload;
        if (!result.succes) return thunkAPI.rejectWithValue(result);
      }
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

const initialState = {
  isLoggedIn: false,
  regist: { step: 1, user: {} }
};
export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    LoginSuccess: state => {
      state.isLoggedIn = true;
    },
    LoginFail: state => {
      state.isLoggedIn = false;
    },
    SetRegistInfo: (state, action) => {
      const {
        payload: { step, user }
      } = action;
      state.regist.step = step;
      if (user) state.regist.user = user;
    }
  },
  extraReducers: builder => {
    /** 회원가입 **/
    builder.addCase(signUp.fulfilled, (state, action) => {
      Log.debug('signUp.fulfilled', state, action);
      state.isLoggedIn = true;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      Log.debug('signUp.rejected', state, action);
      state.isLoggedIn = false;
    });

    /** 로그인 **/
    builder.addCase(signIn.fulfilled, (state, action) => {
      Log.debug('signIn.fulfilled', state, action);
      state.isLoggedIn = true;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      Log.debug('signIn.rejected', state, action);
      state.isLoggedIn = false;
    });

    /** 로그아웃 **/
    builder.addCase(signOut.fulfilled, (state, action) => {
      Log.debug('signOut.fulfilled', state, action);
      state.isLoggedIn = false;
    });

    /** 상태체크 **/
    builder.addCase(authCheck.fulfilled, (state, action) => {
      Log.debug('authCheck.fulfilled', state, action);
      state.isLoggedIn = true;
    });
    builder.addCase(authCheck.rejected, (state, action) => {
      Log.debug('authCheck.rejected', state, action);
      state.isLoggedIn = false;
      clearAllAccessData(false); //기존 Store 삭제
    });

    /** 비밀번호 변경 **/
    builder.addCase(passwordChange.fulfilled, (state, action) => {
      Log.debug('passwordChange.fulfilled', state, action);
    });
    builder.addCase(passwordChange.rejected, (state, action) => {
      Log.debug('passwordChange.rejected', state, action);
    });

    /** 비밀번호 변경 토큰생성 **/
    builder.addCase(passwordResetToken.fulfilled, (state, action) => {
      Log.debug('passwordResetToken.fulfilled', state, action);
    });
    builder.addCase(passwordResetToken.rejected, (state, action) => {
      Log.debug('passwordResetToken.rejected', state, action);
    });

    /** 새로운 비밀번호 변경 **/
    builder.addCase(passwordReset.fulfilled, (state, action) => {
      Log.debug('passwordReset.fulfilled', state, action);
    });
    builder.addCase(passwordReset.rejected, (state, action) => {
      Log.debug('passwordReset.rejected', state, action);
    });
  }
});

export const { LoginSuccess, LoginFail, SetRegistInfo } = authSlice.actions;

export default authSlice.reducer;
