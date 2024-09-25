export default [
    {
        path: '/diary',
        component: () => import('@/views/diary/DiaryRoot.vue'), // Diary 루트 컴포넌트
        children: [
            {
                path: '/list',
                component: () => import('@/views/diary/DiaryList.vue'),
            },
        ],
    },
];
