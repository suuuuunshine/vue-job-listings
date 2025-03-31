import { createRouter, createWebHistory } from 'vue-router';
import JobDetail from '../views/JobDetail.vue';
import JobList from '../views/JobList.vue';

const routes = [
  {
    path: '/', 
    redirect: '/jobs', 
  },
  {
    path: '/jobs', 
    name: 'JobList',
    component: JobList,
  },
  {
    path: '/jobs/:id',
    component: JobDetail
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
