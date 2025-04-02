import { describe, it, expect } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useJobStore } from "../stores/jobStore";

describe("Job Store", () => {
  setActivePinia(createPinia());
  const store = useJobStore();

  it("fetches jobs", async () => {
    await store.fetchJobsForPage();
    expect(store.jobs.length).toBeGreaterThan(0);
  });

  it("filters jobs correctly", () => {
    store.filterJobs("Frontend");
    expect(store.jobs.every((job) => job.category === "Frontend")).toBe(true);
  });
});
