<template>
  <header class="job-header">
    <router-link to="/jobs" class="job-header-title white--text">Job Listings</router-link>
  </header>
    <router-view/>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<style lang="scss" scoped>
.job-header-title {
  font-size: 24px;
  padding: 20px;
  font-weight: 600;  
  margin-top: 20px;
}
</style>
