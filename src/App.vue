<template>
  <header class="header">
    <router-link to="/jobs" class="job-header-title white--text"
      >Job Listings</router-link
    >
  </header>
  <router-view />
  <JobApplicationModal />
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import JobApplicationModal from "../src/components/JobApplicationModal.vue";
</script>

<style lang="scss" scoped>
.job-header-title {
  font-size: 24px;
  padding: 20px;
  font-weight: 600;
  margin-top: 20px;
}

.header {
  background-color: var(--dark-blue);
  color: white;
  padding: 16px;
  text-align: center;
  border-radius: 8px;
  margin: 20px;
}
</style>
