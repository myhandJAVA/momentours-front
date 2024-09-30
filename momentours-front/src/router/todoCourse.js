// export default [
//     {
//         path: '/todocourse',
//         component: () => import('@/views/todocourse/TodoCourseList.vue'),
//         children: [
//             {
//                 path: 'regist',
//                 component: () => import('@/views/todocourse/TodoCourseRegist.vue'),
//             },
//         ],
//     },
// ];
export default [
    {
        path: '/todocourse',
        component: () => import('@/views/todocourse/TodoCourseRoot.vue'),
        redirect: {path:"/todocourse/view"},
        children: [
            {
                path: 'regist',
                component: () => import('@/views/todocourse/TodoCourseRegist.vue'),
            },
            {
                path: 'view',
                component: () => import('@/views/todocourse/TodoCourseView.vue'),
            },
            {
                path: 'detail/:id',
                // name: 'TodoCourseDetailView',
                component: () => import('@/views/todocourse/TodoCourseDetailView.vue'),
            }
        ],
    },
];