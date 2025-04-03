<template>
  <div>
    <div class="handlers">
      <CategoryFilter />
      <input
        type="search"
        class="search-input"
        placeholder="Search for jobs by title, description, location, or company"
        @input="onSearch"
      />
    </div>
    <div v-if="store.loading" class="loading" data-testid="loading-state">
      <p>Loading....</p>
    </div>

    <div v-else-if="empty" class="empty" data-testid="empty-state">
      <p>No jobs found.</p>
      <p>Remove the filters or search words.</p>
    </div>

    <div v-else class="cards">
      <JobCard
        v-for="job in store.jobs"
        :key="job.id"
        :job="job"
        :highlight="searchQuery"
      />
    </div>

    <div class="pagination" v-if="!store.loading && !empty && totalPages !== 1">
      <button
        data-testid="previous-button"
        :disabled="currentPage === 1"
        @click="prevPage"
      >
        Previous
      </button>
      <span class="current-page"
        >Page {{ currentPage }} of {{ totalPages }}</span
      >
      <button
        data-testid="next-button"
        :disabled="currentPage >= totalPages"
        @click="nextPage"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import CategoryFilter from "../components/CategoryFilter.vue";
import JobCard from "../components/JobCard.vue";

import { ref, computed } from "vue";
import { useJobsStore } from "../stores/jobsStore";

const searchQuery = ref("");
const onSearch = (event: Event) => {
  const query = (event.target as HTMLSelectElement).value;
  searchQuery.value = query;
  setTimeout(() => {
    store.searchJobs(query);
  }, 500);
};

const store = useJobsStore();

const totalPages = computed(() => {
  return Math.ceil(store.totalCount / store.limit);
});

const currentPage = computed(() => store.page);

const prevPage = () => {
  if (store.page > 1) {
    store.previousPage();
  }
};

const nextPage = () => {
  if (store.page < totalPages.value) {
    store.nextPage();
  }
};

const empty = computed(() => !store.jobs.length);
</script>

<style lang="scss" scoped>
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  gap: 16px;
  padding: 12px;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 20px;
}

.pagination button {
  padding: 8px 16px;
  background-color: var(--dark-blue);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.current-page {
  padding: 8px;
}

.pagination button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.handlers {
  display: flex;
  justify-content: end;
  align-items: center;
  margin: 0 12px;
}

.search-input {
  padding: 8px 12px;
  max-width: 400px;
  flex-grow: 1;
  border-radius: 50px;
  margin-left: 4px;
  border: none;
  color: var(--dark-blue);
  &::placeholder {
    color: var(--dark-blue);
  }
  &:focus {
    outline: none;
  }
}

.loading,
.empty {
  height: 70vh;
  text-align: center;
  font-size: 1.2rem;
  color: var(--mountbatten-pink);
  padding: 20px;
}
</style>
