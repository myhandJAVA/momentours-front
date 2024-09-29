export default [
    {
        path: '/login',
        component: () => import('@/views/user/UserLogin.vue'),
        // children: [
        //     {
        //         path: '/signup',
        //         component: () => import('@/views/user/UserSignUp.vue'),
        //     },
        // ],
    },
    {
        path: '/signup',
        component: () => import('@/views/user/UserSignUp.vue'),
    },

    {
        path: '/mypage',
        component: () => import('@/views/user/UserMyPage.vue'),
    },
];
