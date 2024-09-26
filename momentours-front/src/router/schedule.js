export default [
    {
        path: '/schedule',
        component: () => import('@/views/schedule/ScheduleRoot.vue'),
        children: [
            {
                path: 'view',
                component: () => import('@/views/schedule/ScheduleView.vue')
            },
            {
                path: 'edit',
                component: () => import('@/views/schedule/ScheduleEdit.vue')
            }
        ]
    }
];
