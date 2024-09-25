export default [
    {
        path: '/moment',
        component: () => import('@/views/moment/MomentRoot.vue'),
        children: [
            {
                path: '/regist',
                component: () => import('@/views/moment/MomentRegist.vue'),
            },
        ],
    },
];
