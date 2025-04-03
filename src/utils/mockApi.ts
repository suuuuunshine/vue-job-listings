import type { Job } from "../types/job";

interface FetchJobsResponse {
  jobs: Job[];
  total: number;
}

export const fetchJobs = async (
  page: number,
  limit: number,
  category: string,
  searchQuery: string
): Promise<FetchJobsResponse> => {
  const response = await fetch("/jobs.json");
  let jobData: Job[] = await response.json();

  if (category) {
    jobData = jobData.filter((job) => job.category === category);
  }

  if (searchQuery) {
    jobData = jobData.filter(
      (job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  return {
    jobs: jobData.slice(startIndex, endIndex),
    total: jobData.length,
  };
};

export const fetchJobById = async (id: number): Promise<Job | undefined> => {
  try {
    const response = await fetch("/jobs.json");

    if (!response.ok) {
      throw new Error("Failed to fetch job data");
    }

    const jobData: Job[] = await response.json();
    return jobData.find((job) => job.id === id);
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    return undefined;
  }
};
