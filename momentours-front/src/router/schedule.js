export default [
    {
        path: '/schedule',
        component: () => import('@/views/schedule/ScheduleRoot.vue'),
        redirect: {path:"/schedule/view"},
        children: [
            {
                path: 'view',
                component: () => import('@/views/schedule/ScheduleView.vue')
            },
            {
                path: 'edit',
                component: () => import('@/views/schedule/ScheduleEdit.vue')
            },
            {
                path: 'remove',
                component: () => import('@/views/schedule/ScheduleRemove.vue')
            },
            {
                path: 'regist',
                component: () => import('@/views/schedule/ScheduleRegist.vue')
            }
        ]
    }
];
