export default [
    {
        path: '/diary',
        component: () => import('@/views/diary/DiaryRoot.vue'), // Diary 루트 컴포넌트
        redirect: {path:"/diary/view"},
        children: [
            {
                path: 'view',
                component: () => import('@/views/diary/DiaryView.vue'),
            },
            {
                path: 'remove',
                component: () => import('@/views/diary/DiaryRemove.vue'),
            },
        ],
    },
    {
        path: '/diary/regist',
        component: () => import('@/views/diary/DiaryRegist.vue'),
    },
    {
        path: '/diary/edit/:id',
        name: 'DiaryEdit',
        component: () => import('@/views/diary/DiaryEdit.vue'),
        props: true,
    },
];
