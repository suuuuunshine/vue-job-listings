<template>
  <div class="select-wrapper">
    <p class="label">Filter by category</p>
    <select class="muted-blue white--text" @change="onCategoryChange">
      <option value="">All</option>
      <option value="Frontend">Frontend</option>
      <option value="Backend">Backend</option>
      <option value="Fullstack">Fullstack</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { useJobStore } from "../stores/jobStore";

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
