export default [
    {
        path: '/couple',
        component: () => import('@/views/couple/CoupleRoot.vue'),
        children: [
            {
                path: '/regist',
                component: () => import('@/views/couple/CoupleRegist.vue'),
            },
        ],
    },
];
