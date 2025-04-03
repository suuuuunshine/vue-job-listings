import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchJobs } from "../utils/mockApi";
import type { Job } from "../types/job";

export const useJobsStore = defineStore("jobsStore", () => {
  const jobs = ref<Job[]>([]);
  const page = ref(1);
  const limit = ref(8);
  const selectedCategory = ref("");
  const searchQuery = ref("");
  const totalCount = ref(0);
  const apiError = ref("");
  const loading = ref(true);

  const resetJobs = () => {
    jobs.value = [];
    page.value = 1;
    selectedCategory.value = "";
    searchQuery.value = "";
    totalCount.value = 0;
    loading.value = true;
  };

  const fetchJobsForPage = async () => {
    console.log("fetch");
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
      apiError.value = "Failed to fetch jobs, please try again later.";
    } finally {
      loading.value = false;
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

  return {
    jobs,
    page,
    limit,
    totalCount,
    searchQuery,
    selectedCategory,
    loading,
    apiError,
    fetchJobsForPage,
    nextPage,
    previousPage,
    filterJobs,
    searchJobs,
    resetJobs,
  };
});
