import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchJobs } from "../utils/mockApi";
import type { Job } from "../types/job";

export const useJobStore = defineStore("jobStore", () => {
  const jobs = ref<Job[]>([]);
  const page = ref(1);
  const limit = ref(6);
  
  const fetchJobsForPage = async () => {
    try {
      const jobData = await fetchJobs(page.value, limit.value); 
      jobs.value = jobData; 
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    }
  };
  
  const nextPage = () => {
    page.value++;
    fetchJobsForPage();
  };
  
  const previousPage = () => {
    if (page.value > 1) {
      page.value--;
      fetchJobsForPage();
    }
  };

  fetchJobsForPage();

  return { jobs, page, limit, nextPage, previousPage };
});
