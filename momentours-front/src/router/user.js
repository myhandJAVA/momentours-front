export default [
    {
        path: '/login',
        component: () => import('@/views/user/UserLogin.vue'),
        children: [
            {
                path: '/signup',
                component: () => import('@/views/user/UserLogin.vue'),
            },
        ],
    },
];
