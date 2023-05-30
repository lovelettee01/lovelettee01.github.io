export const dashboardRoutes = {
  label: 'Dashboard',
  labelDisable: true,
  children: [
    {
      name: 'Dashboard',
      active: true,
      icon: 'chart-pie',
      children: [
        {
          name: 'Default',
          to: '/',
          exact: true,
          active: true
        }
      ]
    }
  ]
};
export const appRoutes = {
  label: 'app',
  children: [
    {
      name: 'E Learning',
      icon: 'graduation-cap',
      active: true,
      badge: {
        type: 'success',
        text: 'New'
      },
      children: [
        {
          name: 'Course',
          active: true,
          children: [
            {
              name: 'Course list',
              to: '/e-learning/course/course-list',
              active: true
            },
            {
              name: 'Course grid',
              to: '/e-learning/course/course-grid',
              active: true
            },
            {
              name: 'Course details',
              to: '/e-learning/course/course-details',
              active: true
            },
            {
              name: 'Create a course',
              to: '/e-learning/course/create-a-course',
              active: true
            }
          ]
        },
        {
          name: 'Student overview',
          to: '/e-learning/student-overview',
          active: true
        },
        {
          name: 'Trainer profile',
          to: '/e-learning/trainer-profile',
          active: true
        }
      ]
    }
  ]
};

export default [dashboardRoutes, appRoutes];
