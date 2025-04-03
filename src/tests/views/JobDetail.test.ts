import { flushPromises, mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import { useModalStore } from "../../stores/jobApplicationModalStore";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import JobDetail from "../../views/JobDetail.vue";
import JobList from "../../views/JobList.vue";
import NotFound from "../../views/NotFound.vue";

vi.mock("../../utils/mockApi", () => ({
  fetchJobById: vi.fn().mockResolvedValue({
    id: 1,
    title: "Frontend Developer",
    category: "Frontend",
    company: "TechCorp",
    description:
      "We're looking for a Vue.js developer to join our dynamic team and work on building innovative web applications.",
    location: "Remote",
  }),
}));

describe("JobDetail", () => {
  let router: ReturnType<typeof createRouter>;

  beforeEach(() => {
    router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: "/", name: "home", redirect: "/jobs" },
        { path: "/jobs", name: "job-list", component: JobList },
        { path: "/jobs/:id", name: "job-detail", component: JobDetail },
        { path: "/:pathMatch(.*)*", name: "404", component: NotFound },
      ],
    });
    setActivePinia(createPinia());
  });

  it("should render the Job Description view correctly", async () => {
    router.push("/jobs");
    await router.isReady();

    const wrapper = mount(JobDetail, {
      global: {
        plugins: [router],
      },
    });

    await flushPromises();

    expect(wrapper.find(".title").text()).toBe("About us");
    expect(wrapper.find("p").text()).toContain(
      "At PixelCrafters, we're not just building the future"
    );
  });

  it("should show the job view if a job is found by the id param", async () => {
    router.push({ name: "job-detail", params: { id: "1" } });
    await router.isReady();

    const wrapper = mount(JobDetail, {
      global: {
        plugins: [router],
      },
    });

    await flushPromises();

    expect(wrapper.find("[data-testid='job-view']").exists()).toBe(true);
    expect(wrapper.find("[data-testid='job-title']").text()).toBe(
      "Frontend Developer"
    );
    expect(wrapper.find("[data-testid='job-description']").text()).toBe(
      "We're looking for a Vue.js developer to join our dynamic team and work on building innovative web applications."
    );
  });

  it("redirects to 404 if job is not found", async () => {
    router.push({ name: "job-detail", params: { id: "notid" } });
    await router.isReady();

    const wrapper = mount(JobDetail, {
      global: {
        plugins: [router],
      },
    });

    await flushPromises();

    expect(wrapper.vm.$route.name).toBe("404");
  });

  it("opens the modal when clicking 'Apply now!' button", async () => {
    router.push({ name: "job-detail", params: { id: "1" } });
    await router.isReady();

    const wrapper = mount(JobDetail, {
      global: {
        plugins: [router],
      },
    });

    await flushPromises();

    const modalStore = useModalStore();
    const mockOpenModal = vi.fn();
    modalStore.openModal = mockOpenModal;

    const applyButton = wrapper.find("[data-testid='apply-now-button']");

    await applyButton.trigger("click");

    expect(mockOpenModal).toHaveBeenCalled();
    expect(mockOpenModal).toHaveBeenCalledWith({
      category: "Frontend",
      company: "TechCorp",
      description:
        "We're looking for a Vue.js developer to join our dynamic team and work on building innovative web applications.",
      id: 1,
      location: "Remote",
      title: "Frontend Developer",
    });
  });
});
