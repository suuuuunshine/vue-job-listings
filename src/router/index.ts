import { createRouter, createWebHistory } from "vue-router";
import JobDetail from "../views/JobDetail.vue";
import JobList from "../views/JobList.vue";
import NotFound from "../views/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "job-list",
    component: JobList,
  },
  {
    path: "/jobs/:id",
    name: "job-description",
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
