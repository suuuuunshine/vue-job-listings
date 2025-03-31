<template>
  <div class="select-wrapper">
    <p class="label">Filter by category</p>
    <select class="magenta white--text" @change="onCategoryChange">
      <option value="">All</option>
      <option value="Frontend">Frontend</option>
      <option value="Backend">Backend</option>
      <option value="Fullstack">Fullstack</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { useJobStore } from "../store/jobStore";

const store = useJobStore();

const onCategoryChange = (event: Event) => {
  const selectedCategory = (event.target as HTMLSelectElement).value;

  store.filterJobs(selectedCategory);
};
</script>

<style lang="scss" scoped>
.select-wrapper {
  display: flex;
  align-items: center;
  padding: 0 12px;
}

select {
  border-radius: 12px;
  padding: 4px 6px;
  margin: 12px;
  border: 0;
}

select:focus {
  outline: none;
  border-color: var(--magenta-haze);
}

.label {
  font-size: 12px;
}
</style>
