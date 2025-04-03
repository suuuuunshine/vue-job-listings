import { flushPromises, mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import JobList from "../../views/JobList.vue";
import { useJobsStore } from "../../stores/jobsStore";

//Mock the components because they already have their own tests
vi.mock("../../components/CategoryFilter.vue", () => ({
  default: {
    template: "<div class='category-filter'></div>",
  },
}));

vi.mock("../../components/JobCard.vue", () => ({
  default: {
    props: ["job", "highlight"],
    template: "<div class='job-card'>{{ job.title }}</div>",
  },
}));

vi.mock("../../utils/mockApi", () => ({
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

describe("JobList.vue", () => {
  let store: ReturnType<typeof useJobsStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useJobsStore();
  });

  it("should render the loading state", async () => {
    store.loading = true;
    const wrapper = mount(JobList);
    await flushPromises();
    expect(wrapper.find("[data-testid='loading-state']").exists()).toBe(true);
  });

  it("should render the error state", async () => {
    store.apiError = "Api error!!!";
    const wrapper = mount(JobList);
    await flushPromises();
    expect(wrapper.find("[data-testid='error-state']").exists()).toBe(true);
  });

  it("should render the empty state when there are no jobs", async () => {
    store.jobs = [];
    const wrapper = mount(JobList);
    await flushPromises();
    expect(wrapper.find("[data-testid='empty-state']").exists()).toBe(true);
  });

  it("should render the job cards when jobs are available", async () => {
    store.jobs = [
      {
        id: 1,
        title: "Frontend Developer",
        category: "Engineering",
        company: "TechCorp",
        description: "Develop amazing UIs",
        location: "Remote",
      },
      {
        id: 2,
        title: "Backend Developer",
        category: "Engineering",
        company: "CodeMasters",
        description: "Build scalable APIs",
        location: "New York",
      },
    ];

    const wrapper = mount(JobList);
    await flushPromises();
    expect(wrapper.findAll(".job-card").length).toBe(2);
  });

  it("should filter jobs based on search query", async () => {
    store.jobs = [
      {
        id: 1,
        title: "Frontend Developer",
        category: "Engineering",
        company: "TechCorp",
        description: "Develop amazing UIs",
        location: "Remote",
      },
      {
        id: 2,
        title: "Backend Developer",
        category: "Engineering",
        company: "CodeMasters",
        description: "Build scalable APIs",
        location: "New York",
      },
    ];

    store.searchJobs = vi.fn();

    const wrapper = mount(JobList);
    const input = wrapper.find(".search-input");
    await input.setValue("Frontend");
    await input.trigger("input");

    setTimeout(() => {
      expect(store.searchJobs).toHaveBeenCalledWith("Frontend");
    }, 500);
  });

  it("should handle the pagination buttons", async () => {
    store.jobs = [
      {
        id: 1,
        title: "Frontend Developer",
        category: "Engineering",
        company: "TechCorp",
        description: "Develop amazing UIs",
        location: "Remote",
      },
      {
        id: 2,
        title: "Backend Developer",
        category: "Engineering",
        company: "CodeMasters",
        description: "Build scalable APIs",
        location: "New York",
      },
    ];

    store.page = 2;
    store.totalCount = 10;
    store.limit = 2;
    store.previousPage = vi.fn();
    store.nextPage = vi.fn();

    const wrapper = mount(JobList);
    await flushPromises();
    await wrapper.find("[data-testid='previous-button']").trigger("click");
    expect(store.previousPage).toHaveBeenCalled();
    await wrapper.find("[data-testid='next-button']").trigger("click");
    expect(store.previousPage).toHaveBeenCalled();
  });
});
