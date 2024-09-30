export default [
    {
    path: "/randomquestion",
    component: () => import("@/views/randomquestion/RandomQuestionRoot.vue"),
    children: [
    {
        path: "view",
        component: () => import("@/views/randomquestion/RandomQuestion.vue"),
    },
    ],
    },
];
