export default [
    {
        path: '/momentcourse',
        component: () => import('@/views/momentcourse/MomentCourseList.vue'),
        children: [
            {
                path: 'list',
                component: () => import('@/views/momentcourse/MomentCourseList.vue'),
            },
        ],
    },
    {
        path: '/momentcourse/view/:id',
        component: () => import('@/views/momentcourse/MomentCourseView.vue'),
    },
];
