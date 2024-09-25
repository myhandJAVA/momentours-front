export default [
    {
        path: '/todocourse',
        component: () => import('@/views/todocourse/TodoCourseRoot.vue'),
        children: [
            {
                path: '/list',
                component: () => import('@/views/todocourse/TodoCourseList.vue'),
            },
        ],
    },
];
