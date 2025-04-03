import { createRouter, createWebHistory } from "vue-router";
import JobDetail from "../views/JobDetail.vue";
import JobList from "../views/JobList.vue";
import NotFound from "../views/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/jobs",
  },
  {
    path: "/jobs",
    name: "job-list",
    component: JobList,
  },
  {
    path: "/jobs/:id",
    name: "job-detail",
    component: JobDetail,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
