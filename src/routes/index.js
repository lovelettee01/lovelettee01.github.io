import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AuthSimpleLayout from '../layouts/AuthSimpleLayout';
import ErrorLayout from '../layouts/ErrorLayout';

import Error404 from 'components/errors/Error404';
import Error500 from 'components/errors/Error500';

import Login from 'components/authentication/simple/Login';
import Logout from 'components/authentication/simple/Logout';
import Registration from 'components/authentication/simple/Registration';
import ForgetPassword from 'components/authentication/simple/ForgetPassword';
import PasswordReset from 'components/authentication/simple/PasswordReset';

import Companys from 'components/pages/company/lists/Companys';
import CompanyDetails from 'components/pages/company/details';
import CompanyCreate from 'components/pages/company/create';

import Post from 'components/pages/post/lists/Posts';
import PostDetails from 'components/pages/post/details/PostDetails';
import ProtectedRoute from './ProtectedRoute';

const WebsiteRoutes = () => {
  return (
    <Routes>
      <Route element={<ErrorLayout />}>
        <Route path="errors/404" element={<Error404 />} />
        <Route path="errors/500" element={<Error500 />} />
      </Route>

      {/* //--- AuthLayout Starts  */}
      <Route element={<AuthSimpleLayout />}>
        <Route path="signin" element={<Login />} />
        <Route path="signout" element={<Logout />} />
        <Route path="signup" element={<Registration />} />
        <Route path="password_reset" element={<PasswordReset />} />
        <Route path="password_forgot" element={<ForgetPassword />} />
      </Route>

      {/* //--- MainLayout Starts  */}
      <Route element={<MainLayout />}>
        {/* Default */}
        <Route path="/" element={<Navigate to="/post/list" replace />} />

        {/* Company */}
        <Route path="company/:companyLayout" element={<Companys />} />
        <Route path="company/details/:companyId" element={<CompanyDetails />} />
        <Route path="company/create" element={<CompanyCreate />} />

        {/* Post */}
        <Route
          path="post/:postLayout"
          element={
            <ProtectedRoute>
              <Post />
            </ProtectedRoute>
          }
        />
        <Route path="post/details/:postId" element={<PostDetails />} />
        <Route path="post/create" element={<CompanyCreate />} />
      </Route>

      {/* //--- MainLayout end  */}

      {/* <Navigate to="/errors/404" /> */}
      <Route path="*" element={<Navigate to="/errors/404" replace />} />
    </Routes>
  );
};

export default WebsiteRoutes;
