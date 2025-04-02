import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchJobs } from "../utils/mockApi";
import type { Job } from "../types/job";

export const useJobStore = defineStore("jobStore", () => {
  const jobs = ref<Job[]>([]);
  const page = ref(1);
  const limit = ref(8);
  const selectedCategory = ref("");
  const searchQuery = ref("");
  const totalCount = ref(0);

  const fetchJobsForPage = async () => {
    try {
      const { jobs: fetchedJobs, total } = await fetchJobs(
        page.value,
        limit.value,
        selectedCategory.value,
        searchQuery.value
      );

      jobs.value = fetchedJobs;
      totalCount.value = total;
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

  const filterJobs = (category: string) => {
    selectedCategory.value = category;
    page.value = 1;
    fetchJobsForPage();
  };

  const searchJobs = (query: string) => {
    searchQuery.value = query;
    page.value = 1;
    fetchJobsForPage();
  };

  fetchJobsForPage();

  return {
    jobs,
    page,
    limit,
    totalCount,
    searchQuery,
    fetchJobsForPage,
    nextPage,
    previousPage,
    filterJobs,
    searchJobs,
  };
});
