import type { Job } from "../types/job";
export declare const useJobStore: import("pinia").StoreDefinition<"jobStore", Pick<{
    jobs: import("vue").Ref<{
        id: number;
        title: string;
        category: string;
        company: string;
        description: string;
        location: string;
    }[], Job[] | {
        id: number;
        title: string;
        category: string;
        company: string;
        description: string;
        location: string;
    }[]>;
    page: import("vue").Ref<number, number>;
    limit: import("vue").Ref<number, number>;
    totalCount: import("vue").Ref<number, number>;
    searchQuery: import("vue").Ref<string, string>;
    fetchJobsForPage: () => Promise<void>;
    nextPage: () => void;
    previousPage: () => void;
    filterJobs: (category: string) => void;
    searchJobs: (query: string) => void;
}, "jobs" | "page" | "limit" | "totalCount" | "searchQuery">, Pick<{
    jobs: import("vue").Ref<{
        id: number;
        title: string;
        category: string;
        company: string;
        description: string;
        location: string;
    }[], Job[] | {
        id: number;
        title: string;
        category: string;
        company: string;
        description: string;
        location: string;
    }[]>;
    page: import("vue").Ref<number, number>;
    limit: import("vue").Ref<number, number>;
    totalCount: import("vue").Ref<number, number>;
    searchQuery: import("vue").Ref<string, string>;
    fetchJobsForPage: () => Promise<void>;
    nextPage: () => void;
    previousPage: () => void;
    filterJobs: (category: string) => void;
    searchJobs: (query: string) => void;
}, never>, Pick<{
    jobs: import("vue").Ref<{
        id: number;
        title: string;
        category: string;
        company: string;
        description: string;
        location: string;
    }[], Job[] | {
        id: number;
        title: string;
        category: string;
        company: string;
        description: string;
        location: string;
    }[]>;
    page: import("vue").Ref<number, number>;
    limit: import("vue").Ref<number, number>;
    totalCount: import("vue").Ref<number, number>;
    searchQuery: import("vue").Ref<string, string>;
    fetchJobsForPage: () => Promise<void>;
    nextPage: () => void;
    previousPage: () => void;
    filterJobs: (category: string) => void;
    searchJobs: (query: string) => void;
}, "fetchJobsForPage" | "nextPage" | "previousPage" | "filterJobs" | "searchJobs">>;
