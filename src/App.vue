<template>
  <header class="header">
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

.header{
  background-color: var(--magenta-haze);
  color: white;
  padding: 16px;
  text-align: center;
  border-radius: 8px;
  margin: 20px;
}
</style>
