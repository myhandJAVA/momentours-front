export default [
    {
        path: '/todocourse',
        component: () => import('@/views/todocourse/TodoCourseList.vue'),
        children: [
            {
                path: '/regist',
                component: () => import('@/views/todocourse/TodoCourseRegist.vue'),
            },
        ],
    },
];
