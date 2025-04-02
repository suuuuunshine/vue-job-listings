import { describe, it, expect } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useJobStore } from "../stores/jobStore";

describe("Job Store", () => {
  setActivePinia(createPinia());
  const store = useJobStore();

  it("fetches jobs", async () => {
    await store.fetchJobs();
    expect(store.jobs.length).toBeGreaterThan(0);
  });

  it("filters jobs correctly", () => {
    store.filterJobs("Frontend");
    expect(store.filteredJobs.every((job) => job.category === "Frontend")).toBe(
      true
    );
  });
});
