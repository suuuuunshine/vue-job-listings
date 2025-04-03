import type { Job } from "../types/job";
interface query {
    page?: number;
    category?: string;
    search?: string;
}
export declare const useJobsStore: import("pinia").StoreDefinition<"jobsStore", Pick<{
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
    selectedCategory: import("vue").Ref<string, string>;
    loading: import("vue").Ref<boolean, boolean>;
    apiError: import("vue").Ref<string, string>;
    fetchJobsForPage: () => Promise<void>;
    nextPage: () => void;
    previousPage: () => void;
    filterJobs: (category: string) => void;
    searchJobs: (query: string) => void;
    resetJobs: () => void;
    setQuery: (query: query) => void;
}, "jobs" | "page" | "limit" | "totalCount" | "searchQuery" | "selectedCategory" | "loading" | "apiError">, Pick<{
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
    selectedCategory: import("vue").Ref<string, string>;
    loading: import("vue").Ref<boolean, boolean>;
    apiError: import("vue").Ref<string, string>;
    fetchJobsForPage: () => Promise<void>;
    nextPage: () => void;
    previousPage: () => void;
    filterJobs: (category: string) => void;
    searchJobs: (query: string) => void;
    resetJobs: () => void;
    setQuery: (query: query) => void;
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
    selectedCategory: import("vue").Ref<string, string>;
    loading: import("vue").Ref<boolean, boolean>;
    apiError: import("vue").Ref<string, string>;
    fetchJobsForPage: () => Promise<void>;
    nextPage: () => void;
    previousPage: () => void;
    filterJobs: (category: string) => void;
    searchJobs: (query: string) => void;
    resetJobs: () => void;
    setQuery: (query: query) => void;
}, "fetchJobsForPage" | "nextPage" | "previousPage" | "filterJobs" | "searchJobs" | "resetJobs" | "setQuery">>;
export {};
