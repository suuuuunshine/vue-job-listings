import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import JobList from "../views/JobList.vue";
import JobDetail from "../views/JobDetail.vue";
import NotFound from "../views/NotFound.vue";
import router from "../router";
import { createPinia } from "pinia";
import { flushPromises } from "@vue/test-utils";

vi.mock("../utils/mockApi", () => ({
  fetchJobs: vi.fn().mockResolvedValue({
    jobs: [
      {
        id: 1,
        title: "Frontend Developer",
        category: "Frontend",
        company: "TechCorp",
        description:
          "We're looking for a Vue.js developer to join our dynamic team and work on building innovative web applications.",
        location: "Remote",
      },
      {
        id: 2,
        title: "Backend Developer",
        category: "Backend",
        company: "DevFirm",
        description:
          "Looking for a Node.js expert to develop and maintain server-side logic and database management systems.",
        location: "New York",
      },
    ],
    total: 2,
  }),
}));

describe("Vue Router", () => {
  const pinia = createPinia();

  it("should redirect from / to /jobs", async () => {
    const wrapper = mount(JobList, {
      global: {
        plugins: [router, pinia],
      },
    });

    router.push("/");
    await router.isReady();

    expect(wrapper.vm.$route.path).toBe("/jobs");
  });

  it("should navigate to job-list", async () => {
    const wrapper = mount(JobList, {
      global: {
        plugins: [router, pinia],
      },
    });

    router.push("/jobs");
    await router.isReady();

    expect(wrapper.vm.$route.name).toBe("job-list");
    expect(wrapper.findComponent(JobList).exists()).toBe(true);
  });

  it("should navigate to job-description", async () => {
    const wrapper = mount(JobDetail, {
      global: {
        plugins: [router, pinia],
      },
    });

    await router.push("/jobs/1");
    await router.isReady();
    await flushPromises();

    expect(wrapper.vm.$route.params.id).toBe("1");
    expect(wrapper.findComponent(JobDetail).exists()).toBe(true);
  });

  it("should navigate to NotFound for invalid path", async () => {
    const wrapper = mount(NotFound, {
      global: {
        plugins: [router, pinia],
      },
    });

    router.push("/non-existing-path");
    await router.isReady();
    await flushPromises();

    expect(wrapper.vm.$route.name).toBe("404");
    expect(wrapper.findComponent(NotFound).exists()).toBe(true);
  });
});
