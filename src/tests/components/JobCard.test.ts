import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import JobCard from "../../components/JobCard.vue";
import { useModalStore } from "../../stores/jobApplicationModalStore";
import { createRouter, createWebHistory } from "vue-router";
import type { Job } from "../../types/job";

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: "/", name: "home", component: { template: "<div></div>" } }],
});

describe("JobCard.vue", () => {
  it("should render the job title and company", async () => {
    const job: Job = {
      id: 1,
      title: "Frontend Developer",
      category: "Frontend",
      company: "TechCorp",
      description: "Looking for a Vue developer",
      location: "Remote",
    };

    const wrapper = mount(JobCard, {
      global: {
        plugins: [router],
      },
      props: { job },
    });

    await wrapper.vm.$nextTick();

    const jobTitle = wrapper.find("[data-testid='job-title']");
    const jobCompany = wrapper.find("[data-testid='job-company']");

    expect(jobTitle.exists()).toBe(true);
    expect(jobCompany.exists()).toBe(true);

    expect(jobTitle.text()).toContain("Frontend Developer");
    expect(jobCompany.text()).toContain("TechCorp");
  });

  it("should emit the event when button is clicked", async () => {
    const job: Job = {
      id: 1,
      title: "Frontend Developer",
      category: "Frontend",
      company: "TechCorp",
      description: "Looking for a Vue developer",
      location: "Remote",
    };

    const wrapper = mount(JobCard, {
      global: {
        plugins: [router],
      },
      props: { job },
    });

    const modalStore = useModalStore();
    const mockOpenModal = vi.fn();
    modalStore.openModal = mockOpenModal;

    await wrapper.find("[data-testid='apply-button']").trigger("click");

    expect(mockOpenModal).toHaveBeenCalled();
    expect(mockOpenModal).toHaveBeenCalledWith(job);
  });
});
