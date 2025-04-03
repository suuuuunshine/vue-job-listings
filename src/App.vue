<template>
  <header class="header">
    <button
      class="back-button"
      :style="{ visibility: showBackButton ? 'visible' : 'hidden' }"
      @click="goBack"
    >
      <span class="material-icons">arrow_back</span>
    </button>

    <router-link to="/jobs" class="logo">
      <img
        src="../src/assets/companylogo.png"
        alt="company logo"
        width="100px"
      />
    </router-link>

    <router-link to="/jobs" class="job-header-route white--text">
      Job Listings
    </router-link>
  </header>
  <router-view />
  <JobApplicationModal />
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import JobApplicationModal from "../src/components/JobApplicationModal.vue";

const router = useRouter();
const route = useRoute();
const showBackButton = ref(false);

const goBack = () => {
  router.back();
};

watch(
  () => route.path,
  (newPath) => {
    showBackButton.value = newPath !== "/jobs" && newPath !== "/";
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;
}
.job-header-route {
  font-size: 14px;
  font-weight: 600;
  margin-left: 40px;
}

.header {
  background-color: var(--dark-blue);
  color: white;
  padding: 16px 0 16px 8px;
  border-radius: 20px;
  margin: 20px;
  display: flex;
  align-items: center;
}

.back-button {
  background-color: var(--dark-blue);
  color: white;
  border: none;
  cursor: pointer;
  margin-right: 12px;
}
</style>
