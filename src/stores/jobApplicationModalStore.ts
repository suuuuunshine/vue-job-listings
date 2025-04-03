import { defineStore } from "pinia";
import { ref } from "vue";

export const useModalStore = defineStore("modal", () => {
  const isVisible = ref(false);
  const job = ref<{ title?: string; description?: string } | null>(null);

  const openModal = (jobData: { title?: string; description?: string }) => {
    job.value = jobData;
    isVisible.value = true;
  };

  const closeModal = () => {
    isVisible.value = false;
    job.value = null;
  };

  return { isVisible, job, openModal, closeModal };
});

export type ModalStore = ReturnType<typeof useModalStore>;
