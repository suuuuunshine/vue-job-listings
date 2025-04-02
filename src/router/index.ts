import { createRouter, createWebHistory } from "vue-router";
import JobDetail from "../views/JobDetail.vue";
import JobList from "../views/JobList.vue";

const routes = [
  {
    path: "/",
    redirect: "/jobs",
  },
  {
    path: "/jobs",
    name: "job-list",
    component: JobList,
  },
  {
    path: "/jobs/:id",
    name: "job-description",
    component: JobDetail,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
