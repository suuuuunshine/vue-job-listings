import type { Job } from "../types/job";
interface FetchJobsResponse {
    jobs: Job[];
    total: number;
}
export declare const fetchJobs: (page: number, limit: number, category: string, searchQuery: string) => Promise<FetchJobsResponse>;
export declare const fetchJobById: (id: number) => Promise<Job | undefined>;
export {};
