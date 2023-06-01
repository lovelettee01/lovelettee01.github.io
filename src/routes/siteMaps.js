export const pageRoutes = {
  label: 'Home',
  labelDisable: true,
  children: [
    {
      name: '종목모임',
      icon: 'flag',
      to: '/company/list',
      active: true
    },
    {
      name: '주주여론 게시물',
      icon: 'file-alt',
      to: '/post/list',
      active: true
    }
  ]
};

export default [pageRoutes];
