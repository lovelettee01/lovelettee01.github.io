import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ErrorLayout from '../layouts/ErrorLayout';

import Error404 from 'components/errors/Error404';
import Error500 from 'components/errors/Error500';

// import Starter from 'components/pages/Starter';
import Courses from 'components/pages/e-learning/course/Courses';
import CourseDetails from 'components/pages/e-learning/course/course-details';
import CreateCourse from 'components/pages/e-learning/course/create-a-course';
import TrainerProfile from 'components/pages/e-learning/trainer-profile';
import StudentOverview from 'components/pages/e-learning/student-overview';

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
        <Route
          path="/"
          element={<Navigate to="/e-learning/course/course-list" replace />}
        />

        {/* E Learning */}
        <Route path="e-learning/course/:courseLayout" element={<Courses />} />
        <Route
          path="e-learning/course/course-details"
          element={<CourseDetails />}
        />
        <Route
          path="e-learning/course/course-details/:courseId"
          element={<CourseDetails />}
        />
        <Route
          path="e-learning/course/create-a-course"
          element={<CreateCourse />}
        />
        <Route path="e-learning/trainer-profile" element={<TrainerProfile />} />
        <Route
          path="e-learning/student-overview"
          element={<StudentOverview />}
        />
      </Route>

      {/* //--- MainLayout end  */}

      {/* <Navigate to="/errors/404" /> */}
      <Route path="*" element={<Navigate to="/errors/404" replace />} />
    </Routes>
  );
};

export default FalconRoutes;
