export const postFilters = [
  {
    open: true,
    label: '공지사항',
    options: [
      {
        label: '공지사항',
        icon: 'file-alt',
        type: 'checkbox',
        value: 'true',
        name: 'is_announcement'
      }
    ]
  },
  {
    open: true,
    label: '게시유형',
    options: [
      {
        label: '일반',
        icon: 'file-alt',
        type: 'radio',
        name: 'post_type',
        value: 'normal'
      },
      {
        label: '청원',
        icon: 'users',
        type: 'radio',
        iconShrink: true,
        name: 'post_type',
        value: 'petition'
      },
      {
        label: '설문',
        icon: 'pen-nib',
        type: 'radio',
        name: 'post_type',
        value: 'opinion_poll'
      }
    ]
  },
  {
    open: true,
    label: '게시상태',
    options: [
      {
        label: 'Active',
        icon: 'star',
        type: 'radio',
        name: 'active_status',
        value: 'active'
      },
      {
        label: 'InActive',
        icon: 'thumbtack',
        type: 'radio',
        name: 'active_status',
        value: 'inactive'
      }
    ]
  }
];

export const postTagList = {
  normal: {
    id: 1,
    type: 'secondary',
    content: '일반',
    icon: 'pen-nib'
  },
  opinion_poll: {
    id: 2,
    type: 'warning',
    content: '설문',
    icon: 'award'
  },
  petition: {
    id: 3,
    type: 'success',
    content: '청원',
    icon: 'crown'
  },
  active: {
    id: 4,
    type: 'danger',
    content: 'Active',
    icon: 'thumbtack'
  },
  inactive: {
    id: 5,
    type: 'primary',
    content: 'inActive',
    icon: 'brush'
  },
  announcement: {
    id: 6,
    type: 'success',
    content: '공지',
    icon: 'hashtag'
  },
  public: {
    id: 7,
    type: 'info',
    content: '공개',
    icon: 'palette'
  }
};
