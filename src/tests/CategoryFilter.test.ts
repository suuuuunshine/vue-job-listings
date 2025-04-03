import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import CategoryFilter from "../components/CategoryFilter.vue";

describe.skip("CategoryFilter.vue", () => {
  let filterJobsMock: vi.Mock;
  beforeEach(() => {
    filterJobsMock = vi.fn();
    useJobStore.mockReturnValue({
      filterJobs: filterJobsMock,
    });
  });
  it("should render the select options correctly", () => {
    const wrapper = mount(CategoryFilter);
    const options = wrapper.findAll("option");
    expect(options).toHaveLength(4);
    expect(options[0].text()).toBe("All");
    expect(options[1].text()).toBe("Frontend");
    expect(options[2].text()).toBe("Backend");
    expect(options[3].text()).toBe("Fullstack");
  });
  it("should call filterJobs with the correct category when an option is selected", async () => {
    const wrapper = mount(CategoryFilter);
    const select = wrapper.find("select");
    await select.setValue("Frontend");
    expect(filterJobsMock).toHaveBeenCalledWith("Frontend");
    await select.setValue("Backend");
    expect(filterJobsMock).toHaveBeenCalledWith("Backend");
    await select.setValue("Fullstack");
    expect(filterJobsMock).toHaveBeenCalledWith("Fullstack");
    await select.setValue("");
    expect(filterJobsMock).toHaveBeenCalledWith("");
  });
});
