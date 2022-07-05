import { createWebHistory, createRouter } from 'vue-router';
import Home from './components/Home.vue';
import notFound from './components/404.vue';
import blogPost from './components/BlogPost.vue'

const routes = [
  {
    path: '/',
    component: Home,
    name: 'Home',
  },
  {
    path: '/blog',
    component: blogPost
  },
  {
    path: '/:pathMatch(.*)*',
    component: notFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
