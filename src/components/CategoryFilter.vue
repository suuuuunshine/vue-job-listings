<template>
  <div class="select-wrapper">
    <p class="label">Filter by category</p>
    <select
      data-testid="category-filter-select"
      class="muted-blue white--text"
      v-model="store.selectedCategory"
      @change="onCategoryChange"
    >
      <option value="">All</option>
      <option value="Frontend">Frontend</option>
      <option value="Backend">Backend</option>
      <option value="Fullstack">Fullstack</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { useJobsStore } from "../stores/jobsStore";
import { useRoute, useRouter } from "vue-router";

const store = useJobsStore();
const router = useRouter();
const route = useRoute();

if (!route.query.category) {
  store.selectedCategory = "";
} else {
  store.selectedCategory = route.query.category as string;
}

const onCategoryChange = (event: Event) => {
  const selectedCategory = (event.target as HTMLSelectElement).value;
  updateQueryParams({ category: selectedCategory, page: 1 });
};

const updateQueryParams = (params: Record<string, string>) => {
  router.push({ query: { ...route.query, ...params, page: 1 } });
};
</script>

<style lang="scss" scoped>
.select-wrapper {
  display: flex;
  align-items: center;
}

select {
  border-radius: 12px;
  padding: 4px 6px;
  border: 0;
  margin-left: 6px;
}

select:focus {
  outline: none;
  border-color: var(--dark-blue);
}

.label {
  font-size: 12px;
  text-align: end;
}
</style>
