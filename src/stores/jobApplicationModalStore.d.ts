export declare const useModalStore: import("pinia").StoreDefinition<"modal", Pick<{
    isVisible: import("vue").Ref<boolean, boolean>;
    job: import("vue").Ref<{
        title?: string | undefined;
        description?: string | undefined;
    } | null, {
        title?: string;
        description?: string;
    } | {
        title?: string | undefined;
        description?: string | undefined;
    } | null>;
    openModal: (jobData: {
        title?: string;
        description?: string;
    }) => void;
    closeModal: () => void;
}, "isVisible" | "job">, Pick<{
    isVisible: import("vue").Ref<boolean, boolean>;
    job: import("vue").Ref<{
        title?: string | undefined;
        description?: string | undefined;
    } | null, {
        title?: string;
        description?: string;
    } | {
        title?: string | undefined;
        description?: string | undefined;
    } | null>;
    openModal: (jobData: {
        title?: string;
        description?: string;
    }) => void;
    closeModal: () => void;
}, never>, Pick<{
    isVisible: import("vue").Ref<boolean, boolean>;
    job: import("vue").Ref<{
        title?: string | undefined;
        description?: string | undefined;
    } | null, {
        title?: string;
        description?: string;
    } | {
        title?: string | undefined;
        description?: string | undefined;
    } | null>;
    openModal: (jobData: {
        title?: string;
        description?: string;
    }) => void;
    closeModal: () => void;
}, "openModal" | "closeModal">>;
