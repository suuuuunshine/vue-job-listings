import type { Job } from "../types/job";


export const fetchJobs = async (page: number, limit: number): Promise<Job[]> => {
  const response = await fetch('/jobs.json'); 
  const jobData: Job[] = await response.json(); 
  
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  return jobData.slice(startIndex, endIndex); 
};