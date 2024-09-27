export default [
    {
        path: '/moment',
        component: () => import('@/views/moment/MomentRoot.vue'),
        children: [
            {
                path: '/regist',
                component: () => import('@/views/moment/MomentRegist.vue'),
            },
            {
                path: '/detail',
                component: () => import('@/views/moment/MomentDetail.vue'),
            },
            {
                path: '/list',
                component: () => import('@/views/moment/MomentList.vue'),
            }
        ],
    },
];
