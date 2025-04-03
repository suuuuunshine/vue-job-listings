import { describe, it, expect, vi, beforeEach } from "vitest";
import { createPinia } from "pinia";
import { useJobStore } from "../stores/jobStore";
import { fetchJobs } from "../utils/mockApi";

vi.mock("../utils/mockApi", () => ({
  fetchJobs: vi.fn().mockResolvedValue({
    jobs: [
      {
        id: 1,
        title: "Frontend Developer",
        category: "Frontend",
        company: "TechCorp",
        description: "Looking for a Vue developer",
        location: "Remote",
      },
    ],
    total: 1,
  }),
}));

const mockJobData = {
  jobs: [
    {
      id: 1,
      title: "Frontend Developer",
      category: "Frontend",
      company: "TechCorp",
      description: "Looking for a Vue developer",
      location: "Remote",
    },
  ],
  total: 1,
};

describe("jobStore", () => {
  let jobStore: ReturnType<typeof useJobStore>;

  beforeEach(() => {
    const pinia = createPinia();
    jobStore = useJobStore(pinia);
  });

  it("should initialize with default values", async () => {
    await jobStore.fetchJobsForPage();

    expect(jobStore.jobs).toEqual(mockJobData.jobs);
    expect(jobStore.page).toBe(1);
    expect(jobStore.limit).toBe(8);
    expect(jobStore.selectedCategory).toBe("");
    expect(jobStore.searchQuery).toBe("");
    expect(jobStore.totalCount).toBe(1);
  });

  it("should call fetchJobsForPage and update jobs and totalCount", async () => {
    await jobStore.fetchJobsForPage();

    expect(fetchJobs).toHaveBeenCalled();
    expect(jobStore.jobs).toEqual(mockJobData.jobs);
    expect(jobStore.totalCount).toBe(mockJobData.total);
  });

  it("should call nextPage and increment the page", async () => {
    await jobStore.nextPage();

    expect(jobStore.page).toBe(2);
    expect(fetchJobs).toHaveBeenCalledWith(2, 8, "", "");
  });

  it("should call previousPage and decrement the page if page > 1", async () => {
    jobStore.page = 2;

    await jobStore.previousPage();

    expect(jobStore.page).toBe(1);
    expect(fetchJobs).toHaveBeenCalledWith(1, 8, "", "");
  });

  it("should not decrement page if it is at the first page", async () => {
    await jobStore.previousPage();

    expect(jobStore.page).toBe(1);
  });

  it("should filter jobs by category", async () => {
    await jobStore.filterJobs("Frontend");

    expect(jobStore.selectedCategory).toBe("Frontend");
    expect(fetchJobs).toHaveBeenCalledWith(1, 8, "Frontend", "");
    expect(jobStore.jobs).toEqual(mockJobData.jobs);
  });

  it("should search jobs by query", async () => {
    await jobStore.searchJobs("Vue");

    expect(jobStore.searchQuery).toBe("Vue");
    expect(fetchJobs).toHaveBeenCalledWith(1, 8, "", "Vue");
    expect(jobStore.jobs).toEqual(mockJobData.jobs);
  });
});
