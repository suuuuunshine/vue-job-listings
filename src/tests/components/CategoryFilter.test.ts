import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import CategoryFilter from "../../components/CategoryFilter.vue";
import { useJobsStore } from "../../stores/jobsStore";

vi.mock("../../utils/mockApi.ts", () => ({
  fetchJobs: vi.fn().mockResolvedValue([]),
}));

describe("CategoryFilter.vue", () => {
  it("should call store.filterJobs with the correct category when the select value changes", async () => {
    const store = useJobsStore();
    const mockFilterJobs = vi.fn();
    store.filterJobs = mockFilterJobs;

    const wrapper = mount(CategoryFilter);

    await wrapper.find("select").setValue("Frontend");

    expect(mockFilterJobs).toHaveBeenCalledWith("Frontend");

    await wrapper.find("select").setValue("Backend");

    expect(mockFilterJobs).toHaveBeenCalledWith("Backend");

    await wrapper.find("select").setValue("");

    expect(mockFilterJobs).toHaveBeenCalledWith("");
  });
});
