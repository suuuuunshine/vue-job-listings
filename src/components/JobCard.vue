<template>
  <div
    data-testid="job-card"
    class="job-card pale-dogwood"
    :style="cardStyle"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @click="goToJobDescription"
  >
    <h3 class="job-title">
      <WordHighlighter
        data-testid="job-title"
        highlight-class="yellow-primary-pink almost-black--text"
        :query="highlight"
        :textToHighlight="job.title"
      />
    </h3>
    <div class="job-info">
      <div class="job-company muted-blue white--text">
        <span class="material-icons">apartment</span>
        <WordHighlighter
          data-testid="job-company"
          highlight-class="yellow-primary-pink almost-black--text"
          :query="highlight"
          :textToHighlight="job.company"
        />
      </div>
      <div class="job-location muted-blue white--text">
        <span class="material-icons">location_on</span>
        <WordHighlighter
          data-testid="job-location"
          highlight-class="yellow-primary-pink almost-black--text"
          :query="highlight"
          :textToHighlight="job.location"
        />
      </div>
    </div>
    <div class="job-description">
      <WordHighlighter
        data-testid="job-description"
        highlight-class="yellow-primary-pink almost-black--text"
        :query="highlight"
        :textToHighlight="job.description"
      />
    </div>
    <button
      @click.stop="applyToJob"
      class="blue-primary white--text"
      data-testid="apply-button"
    >
      Apply
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router"; // To use router for navigation
import WordHighlighter from "vue-word-highlighter";
import { useModalStore } from "../stores/jobApplicationModalStore";

const modalStore = useModalStore();

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

const router = useRouter();

const goToJobDescription = () => {
  router.push({ name: "job-description", params: { id: props.job.id } });
};

const applyToJob = () => {
  modalStore.openModal(props.job);
};
</script>

<style scoped lang="scss">
.job-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: none;
  padding: 16px;
  border-radius: 8px;
  transition: transform 0.3s ease;
  -webkit-box-shadow: 6px 7px 21px 2px rgba(209, 198, 209, 1);
  -moz-box-shadow: 6px 7px 21px 2px rgba(209, 198, 209, 1);
  box-shadow: 6px 7px 21px 2px rgba(209, 198, 209, 1);
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }

  .job-info {
    display: flex;
    font-size: 12px;
    align-items: center;
    margin-bottom: 12px;
  }

  .job-title {
    color: var(--dark-blue);
    margin-bottom: 12px;
  }

  .job-description {
    color: var(--almost-black);
  }

  .job-company,
  .job-location {
    border-radius: 20px;
    margin-right: 12px;
    padding: 4px 8px;
    align-items: center;
    display: flex;
  }

  .material-icons {
    font-size: 14px;
    margin-right: 4px;
  }

  button {
    margin-top: 12px;
    border-radius: 8px;
    padding: 10px;
    border: none;
    cursor: pointer;
    &:hover {
      background-color: var(--dark-blue);
    }
  }
}
</style>
