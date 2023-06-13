import { configureStore } from '@reduxjs/toolkit';
import configReducer from './slices/Config';
import authReducer from './slices/Auth';
import companyReducer from './slices/Company';
import postReducer from './slices/Post';
import messageReducer from './slices/Message';

export default configureStore({
  reducer: {
    config: configReducer,
    auth: authReducer,
    company: companyReducer,
    post: postReducer,
    message: messageReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: process.env.NODE_ENV !== 'production'
});
