import { shallowMount, mount, VueWrapper } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import JobApplicationModal from "../../components/JobApplicationModal.vue";
import {
  useModalStore,
  type ModalStore,
} from "../../stores/jobApplicationModalStore";
import router from "../../router";
import { flushPromises } from "@vue/test-utils";
import type { ComponentPublicInstance } from "vue";

describe("JobApplicationModal.vue", () => {
  let wrapper: VueWrapper<ComponentPublicInstance>;
  let modalStore: ModalStore;

  beforeEach(() => {
    modalStore = useModalStore();

    wrapper = shallowMount(JobApplicationModal, {
      global: {
        plugins: [router],
        stubs: {
          Teleport: true,
        },
      },
      attachTo: document.createElement("div"),
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("should teleport modal to the correct container", async () => {
    document.body.innerHTML = '<div id="modal-container"></div>';

    wrapper = mount(JobApplicationModal, {
      global: {
        stubs: { Teleport: false },
        plugins: [router],
      },
      attachTo: document.createElement("div"),
    });

    modalStore.isVisible = true;
    await flushPromises();

    expect(
      document.body.querySelector('[data-testid="modal-content"]')
    ).not.toBeNull();
  });

  it("should render the modal when modalStore.isVisible is true", async () => {
    modalStore.isVisible = true;
    await flushPromises();

    expect(wrapper.find('[data-testid="modal-overlay"]').exists()).toBe(true);
    expect(wrapper.find(".modal").exists()).toBe(true);
  });

  it("shouldn't render modal when modalStore.isVisible is false", async () => {
    modalStore.isVisible = false;
    await flushPromises();

    expect(wrapper.find('[data-testid="modal-overlay"]').exists()).toBe(false);
    expect(wrapper.find('[data-testid="modal-content"]').exists()).toBe(false);
  });

  it("should call closeModal when clicking on the overlay", async () => {
    modalStore.isVisible = true;
    modalStore.closeModal = vi.fn();
    await flushPromises();

    await wrapper.find('[data-testid="modal-overlay"]').trigger("click");
    expect(modalStore.closeModal).toHaveBeenCalled();
  });

  it("shouldn't submit the form when there are errors", async () => {
    window.alert = vi.fn();
    modalStore.isVisible = true;
    await flushPromises();

    await wrapper.find('[data-testid="submit-button"]').trigger("click");

    expect(window.alert).not.toHaveBeenCalled();
  });

  it("should submit the form when there are no errors", async () => {
    window.alert = vi.fn();
    wrapper = mount(JobApplicationModal, {
      global: { stubs: { Teleport: true } },
      attachTo: document.createElement("div"),
    });

    modalStore.isVisible = true;
    await flushPromises();

    await wrapper.find('[data-testid="first-name-input"]').setValue("John");
    await wrapper.find('[data-testid="last-name-input"]').setValue("Doe");
    await wrapper
      .find('[data-testid="email-input"]')
      .setValue("john.doe@example.com");

    await wrapper.find('[data-testid="modal-form"]').trigger("submit");

    expect(window.alert).toHaveBeenCalledWith(
      `Application submitted successfully:\n Name: John\n Lastname: Doe\n Email: john.doe@example.com\n Resume: No file uploaded`
    );
  });
});
