export default [
    {
        path: '/user',
        component: () => import('@/views/user/UserRoot.vue'),
        children: [
            {
                path: '/login',
                component: () => import('@/views/user/UserLogin.vue'),
            },
        ],
    },
];
