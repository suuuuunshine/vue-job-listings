import { flushPromises, mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import JobList from "../../views/JobList.vue";
import { useJobsStore } from "../../stores/jobsStore";
import { fetchJobs } from "../../utils/mockApi";

// Mock the components because they already have their own tests
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

// Mock API response
vi.mock("../../utils/mockApi", () => ({
  fetchJobs: vi.fn(),
}));

describe("JobList.vue", () => {
  let store: ReturnType<typeof useJobsStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useJobsStore();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should render the loading state", async () => {
    vi.mocked(fetchJobs).mockResolvedValue({
      jobs: [],
      total: 0,
    });
    store.loading = true;
    const wrapper = mount(JobList);

    expect(wrapper.find("[data-testid='loading-state']").exists()).toBe(true);
  });

  it("should render the error state", async () => {
    vi.mocked(fetchJobs).mockResolvedValue({
      jobs: [],
      total: 0,
    });
    store.apiError = "Api error!!!";
    const wrapper = mount(JobList);
    await flushPromises();
    expect(wrapper.find("[data-testid='error-state']").exists()).toBe(true);
  });

  it("should render the empty state when there are no jobs", async () => {
    vi.mocked(fetchJobs).mockResolvedValue({ jobs: [], total: 0 });

    const wrapper = mount(JobList);
    await flushPromises();

    expect(wrapper.find("[data-testid='empty-state']").exists()).toBe(true);
  });

  it("should render the job cards when jobs are available", async () => {
    vi.mocked(fetchJobs).mockResolvedValue({
      jobs: [
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
      ],
      total: 2,
    });

    const wrapper = mount(JobList);
    await flushPromises();

    expect(wrapper.findAll(".job-card").length).toBe(2);
  });

  it("should filter jobs based on search query", async () => {
    vi.mocked(fetchJobs).mockResolvedValue({
      jobs: [
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
      ],
      total: 2,
    });

    store.searchJobs = vi.fn();

    const wrapper = mount(JobList);
    await flushPromises();

    const input = wrapper.find("[data-testid='search-input']");

    await input.setValue("Frontend");
    await input.trigger("input");

    await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for search debounce

    expect(store.searchJobs).toHaveBeenCalledWith("Frontend");
  });

  it("should handle the pagination buttons", async () => {
    vi.mocked(fetchJobs).mockResolvedValue({
      jobs: [
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
      ],
      total: 10,
    });
    vi.spyOn(store, "previousPage");
    vi.spyOn(store, "nextPage");
    const wrapper = mount(JobList);
    await flushPromises();

    await wrapper.find("[data-testid='next-button']").trigger("click");
    await flushPromises();
    expect(store.nextPage).toHaveBeenCalled();

    await wrapper.find("[data-testid='previous-button']").trigger("click");
    await flushPromises();
    expect(store.previousPage).toHaveBeenCalled();
  });
});
