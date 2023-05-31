import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ErrorLayout from '../layouts/ErrorLayout';

import Error404 from 'components/errors/Error404';
import Error500 from 'components/errors/Error500';

// import Starter from 'components/pages/Starter';
import Courses from 'components/pages/board/course/Courses';
import CourseDetails from 'components/pages/board/course/course-details';
import CreateCourse from 'components/pages/board/course/create-a-course';

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
        <Route path="/" element={<Navigate to="/board/list" replace />} />

        {/* E Learning */}
        <Route path="board/:courseLayout" element={<Courses />} />
        <Route path="board/details" element={<CourseDetails />} />
        <Route path="board/details/:courseId" element={<CourseDetails />} />
        <Route path="board/create" element={<CreateCourse />} />
      </Route>

      {/* //--- MainLayout end  */}

      {/* <Navigate to="/errors/404" /> */}
      <Route path="*" element={<Navigate to="/errors/404" replace />} />
    </Routes>
  );
};

export default FalconRoutes;
