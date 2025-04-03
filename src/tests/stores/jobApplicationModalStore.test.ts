import { describe, it, expect, beforeEach } from "vitest";
import { createPinia } from "pinia";
import { useModalStore } from "../../stores/jobApplicationModalStore";

describe("useModalStore", () => {
  let modalStore: ReturnType<typeof useModalStore>;

  beforeEach(() => {
    const pinia = createPinia();
    modalStore = useModalStore(pinia);
  });

  it("should initialize with default values", () => {
    expect(modalStore.isVisible).toBe(false);
    expect(modalStore.job).toBeNull();
  });

  it("should open modal with job data", () => {
    const jobData = {
      title: "Frontend Developer",
      description: "Vue Developer",
    };

    modalStore.openModal(jobData);

    expect(modalStore.isVisible).toBe(true);
    expect(modalStore.job).toEqual(jobData);
  });

  it("should close modal and reset job data", () => {
    const jobData = {
      title: "Frontend Developer",
      description: "Vue Developer",
    };

    modalStore.openModal(jobData);
    modalStore.closeModal();

    expect(modalStore.isVisible).toBe(false);
    expect(modalStore.job).toBeNull();
  });

  it("should handle openModal with optional properties", () => {
    const jobData = { title: "Frontend Developer" };

    modalStore.openModal(jobData);

    expect(modalStore.isVisible).toBe(true);
    expect(modalStore.job).toEqual(jobData);
  });

  it("should handle closeModal multiple times", () => {
    const jobData = {
      title: "Frontend Developer",
      description: "Vue Developer",
    };

    modalStore.openModal(jobData);
    modalStore.closeModal();
    modalStore.closeModal();

    expect(modalStore.isVisible).toBe(false);
    expect(modalStore.job).toBeNull();
  });
});
