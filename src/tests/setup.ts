import { createPinia } from "pinia";
import { createApp } from "vue";
import { render } from "@testing-library/vue";
import JobApplicationModal from "../components/JobApplicationModal.vue";

const pinia = createPinia();

const app = createApp(JobApplicationModal);
app.use(pinia);

render(JobApplicationModal);
