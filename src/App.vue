<template>
  <header class="header">
    <router-link to="/" class="logo">
      <img
        src="../src/assets/companylogo.png"
        alt="company logo"
        width="100px"
      />
    </router-link>

    <router-link to="/" class="job-header-route white--text"
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
.logo {
  display: flex;
  align-items: center;
}
.job-header-route {
  font-size: 16px;
  font-weight: 600;
  margin-left: 62px;
}

.header {
  background-color: var(--dark-blue);
  color: white;
  padding: 16px;
  border-radius: 8px;
  margin: 20px;
  display: flex;
  align-items: center;
}
</style>
