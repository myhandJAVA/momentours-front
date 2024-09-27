export default [
    {
        path: '/diary',
        component: () => import('@/views/diary/DiaryRoot.vue'), // Diary 루트 컴포넌트
        redirect: {path:"/diary/DiaryView"},
        children: [
            {
                path: '/list',
                component: () => import('@/views/diary/DiaryView.vue'),
            },
        ],
    },
];
