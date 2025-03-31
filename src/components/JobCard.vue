<template>
  <div
    class="job-card"
    :style="cardStyle"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @click="goToJobDescription"
  >
    <h3 class="job-title">
      <WordHighlighter
        highlight-class="mountbatten-pink white--text"
        :query="highlight"
        :textToHighlight="job.title"
      />
    </h3>
    <div class="job-info">
      <div class="job-company amaranth pale-dogwood--text">
        <span class="material-icons">apartment</span>
        <WordHighlighter
          highlight-class="mountbatten-pink white--text"
          :query="highlight"
          :textToHighlight="job.company"
        />
      </div>
      <div class="job-location amaranth pale-dogwood--text">
        <span class="material-icons">location_on</span>
        <WordHighlighter
          highlight-class="mountbatten-pink white--text"
          :query="highlight"
          :textToHighlight="job.location"
        />
      </div>
    </div>
    <div class="job-description">
      <WordHighlighter
        highlight-class="mountbatten-pink white--text"
        :query="highlight"
        :textToHighlight="job.description"
      />
    </div>
    <button @click.stop="applyJob" class="apply-button magenta--text">
      Apply
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import { useRouter } from "vue-router";
import WordHighlighter from "vue-word-highlighter";

const props = defineProps({
  job: {
    type: Object,
    required: true,
  },
  highlight: {
    type: String,
    required: false,
    default: "",
  },
});

const cardStyle = ref({
  transform: "scale(1)",
  transition: "transform 0.3s ease",
});

const router = useRouter();

const onMouseEnter = () => {
  cardStyle.value = {
    transform: "scale(1.05)",
    transition: "transform 0.3s ease",
  };
};

const onMouseLeave = () => {
  cardStyle.value = {
    transform: "scale(1)",
    transition: "transform 0.3s ease",
  };
};

const applyJob = () => {
  console.log(`Applying for ${props.job.title}`);
};

const goToJobDescription = () => {
  router.push({ name: "job-description", params: { id: props.job.id } });
};
</script>

<style scoped lang="scss">
.job-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: transparent;
  border: 1px solid var(--mountbatten-pink);
  padding: 16px;
  border-radius: 8px;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }

  .job-info {
    display: flex;
    font-size: 12px;
    align-items: center;
  }

  .job-title {
    color: var(--magenta-haze);
  }

  .job-company,
  .job-location {
    border-radius: 20px;
    margin-right: 12px;
    padding: 4px 8px;
    align-items: center;
    display: flex;
  }

  .job-description {
    color: var(--mountbatten-pink);
  }

  .material-icons {
    font-size: 14px;
    margin-right: 4px;
  }
}
</style>
