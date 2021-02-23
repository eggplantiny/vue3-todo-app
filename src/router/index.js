import { createRouter, createWebHistory } from 'vue-router';
import Todo from '@/views/Todo/index.vue';
import Playground from '@/views/Playground.vue';
const routes = [
    {
        path: '/Todo',
        name: Todo.name,
        component: Todo
    },
    {
        path: '/Playground',
        name: Playground.name,
        component: Playground
    }
];
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});
export default router;
//# sourceMappingURL=index.js.map