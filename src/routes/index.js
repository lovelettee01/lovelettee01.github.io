import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ErrorLayout from '../layouts/ErrorLayout';

import Error404 from 'components/errors/Error404';
import Error500 from 'components/errors/Error500';

// import Starter from 'components/pages/Starter';
import Companys from 'components/pages/company/lists/Companys';
import CompanyDetails from 'components/pages/company/details';
import CompanyCreate from 'components/pages/company/create';

import Post from 'components/pages/post/lists/Posts';
import PostDetails from 'components/pages/post/details/PostDetails';

const FalconRoutes = () => {
  return (
    <Routes>
      <Route element={<ErrorLayout />}>
        <Route path="errors/404" element={<Error404 />} />
        <Route path="errors/500" element={<Error500 />} />
      </Route>

      {/* //--- MainLayout Starts  */}
      <Route element={<MainLayout />}>
        {/*Home*/}
        <Route path="/" element={<Navigate to="/company/list" replace />} />

        {/* Company */}
        <Route path="company/:companyLayout" element={<Companys />} />
        <Route path="company/details/:companyId" element={<CompanyDetails />} />
        <Route path="company/create" element={<CompanyCreate />} />

        {/* Post */}
        <Route path="post/:postLayout" element={<Post />} />
        <Route path="post/details/:postId" element={<PostDetails />} />
        <Route path="post/create" element={<CompanyCreate />} />
      </Route>

      {/* //--- MainLayout end  */}

      {/* <Navigate to="/errors/404" /> */}
      <Route path="*" element={<Navigate to="/errors/404" replace />} />
    </Routes>
  );
};

export default FalconRoutes;
