export default [
    {
        path: '/moment',
        component: () => import('@/views/moment/MomentList.vue'),
    },
    {
        path: '/moment/regist',
        component: () => import('@/views/moment/MomentRegist.vue'),
    },
    {
        path: '/moment/detail/:momentNo',
        component: () => import('@/views/moment/MomentDetail.vue'),
    },
    {
        path: '/moment/edit/:id',
        component: () => import('@/views/moment/MomentEdit.vue'),
    }
];
