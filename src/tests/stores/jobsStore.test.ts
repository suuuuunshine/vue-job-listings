import { describe, it, expect, vi, beforeEach } from "vitest";
import { createPinia } from "pinia";
import { useJobsStore } from "../../stores/jobsStore";
import { fetchJobs } from "../../utils/mockApi";

vi.mock("../../utils/mockApi", () => ({
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

describe("jobsStore", () => {
  let jobsStore: ReturnType<typeof useJobsStore>;

  beforeEach(() => {
    const pinia = createPinia();
    jobsStore = useJobsStore(pinia);
  });

  it("should initialize with default values", async () => {
    await jobsStore.fetchJobsForPage();

    expect(jobsStore.jobs).toEqual(mockJobData.jobs);
    expect(jobsStore.page).toBe(1);
    expect(jobsStore.limit).toBe(8);
    expect(jobsStore.selectedCategory).toBe("");
    expect(jobsStore.searchQuery).toBe("");
    expect(jobsStore.totalCount).toBe(1);
  });

  it("should call fetchJobsForPage and update jobs and totalCount", async () => {
    await jobsStore.fetchJobsForPage();

    expect(fetchJobs).toHaveBeenCalled();
    expect(jobsStore.jobs).toEqual(mockJobData.jobs);
    expect(jobsStore.totalCount).toBe(mockJobData.total);
  });

  it("should call nextPage and increment the page", async () => {
    await jobsStore.nextPage();

    expect(jobsStore.page).toBe(2);
    expect(fetchJobs).toHaveBeenCalledWith(2, 8, "", "");
  });

  it("should call previousPage and decrement the page if page > 1", async () => {
    jobsStore.page = 2;

    await jobsStore.previousPage();

    expect(jobsStore.page).toBe(1);
    expect(fetchJobs).toHaveBeenCalledWith(1, 8, "", "");
  });

  it("should not decrement page if it is at the first page", async () => {
    await jobsStore.previousPage();

    expect(jobsStore.page).toBe(1);
  });

  it("should filter jobs by category", async () => {
    await jobsStore.filterJobs("Frontend");

    expect(jobsStore.selectedCategory).toBe("Frontend");
    expect(fetchJobs).toHaveBeenCalledWith(1, 8, "Frontend", "");
    expect(jobsStore.jobs).toEqual(mockJobData.jobs);
  });

  it("should search jobs by query", async () => {
    await jobsStore.searchJobs("Vue");

    expect(jobsStore.searchQuery).toBe("Vue");
    expect(fetchJobs).toHaveBeenCalledWith(1, 8, "", "Vue");
    expect(jobsStore.jobs).toEqual(mockJobData.jobs);
  });
});
