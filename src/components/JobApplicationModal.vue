<template>
  <Teleport to="body">
    <transition name="fade">
      <div
        v-if="modalStore.isVisible"
        class="modal-overlay"
        data-testid="modal-overlay"
        @click="close"
      >
        <transition name="modal">
          <div class="modal" @click.stop data-testid="modal-content">
            <h2 data-testid="modal-title">
              Apply now for {{ modalStore.job?.title || "this job" }}
            </h2>
            <p class="job-description" data-testid="modal-job-description">
              {{ modalStore.job?.description }}
            </p>
            <form @submit.prevent="submit" data-testid="modal-form">
              <div class="form-group" data-testid="modal-form-group">
                <label for="firstName">First Name*</label>
                <input
                  type="text"
                  required
                  data-testid="first-name-input"
                  v-model="form.firstName"
                  :class="{ invalid: errors.firstName }"
                  @input="validateField('firstName')"
                />
                <p v-if="errors.firstName" class="error-message">
                  {{ errors.firstName }}
                </p>
              </div>

              <div class="form-group">
                <label for="lastName">Last Name*</label>
                <input
                  type="text"
                  required
                  data-testid="last-name-input"
                  v-model="form.lastName"
                  :class="{ invalid: errors.lastName }"
                  @input="validateField('lastName')"
                />
                <p v-if="errors.lastName" class="error-message">
                  {{ errors.lastName }}
                </p>
              </div>

              <div class="form-group">
                <label for="email">Email*</label>
                <input
                  type="email"
                  required
                  data-testid="email-input"
                  v-model="form.email"
                  :class="{ invalid: errors.email }"
                  @input="validateField('email')"
                />
                <p v-if="errors.email" class="error-message">
                  {{ errors.email }}
                </p>
              </div>

              <div class="form-group">
                <label for="resume">Resume (optional)</label>
                <input
                  type="file"
                  data-testid="resume-input"
                  @change="handleFileUpload"
                />
              </div>

              <div class="form-actions">
                <button
                  type="button"
                  data-testid="cancel-button"
                  class="cancel-button"
                  @click="close"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  data-testid="submit-button"
                  class="submit-button"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </transition>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from "vue";
import { useModalStore } from "../stores/jobApplicationModalStore";

const modalStore = useModalStore();

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  resume: null as File | null,
};

const form = reactive({ ...initialForm });


const errors = ref<{ [key: string]: string }>({});

const validateField = (field: string) => {
  if (field === "firstName" || field === "lastName") {
    errors.value[field] = form[field].trim() ? "" : "This field is required.";
  }

  if (field === "email") {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    errors.value.email = form.email.match(emailPattern)
      ? ""
      : "Invalid email address.";
  }
};

const hasErrors = computed(() =>
  Object.values(errors.value).some((error) => error)
);

const submit = () => {
  Object.keys(form).forEach((field) => validateField(field));
  if (hasErrors.value) return;
  console.log("Form submitted:", JSON.stringify(form));
  alert(
    `Application submitted successfully:\n Name: ${
      form.firstName
    }\n Lastname: ${form.lastName}\n Email: ${form.email}\n Resume: ${
      form.resume ? form.resume.name : "No file uploaded"
    }`
  );
  close();
};

const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input?.files?.[0];
  if (file) {
    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB.");
    } else {
      form.resume = file;
    }
  }
};

const close = () => {
  modalStore.closeModal();

  resetForm();
};

const resetForm = () => {
  Object.assign(form, initialForm);
  errors.value = {};
};
</script>

<style scoped lang="scss">
.job-description {
  margin: 12px 0 24px 0;
}

.error-message {
  color: red;
  font-size: 0.9rem;
  margin-top: 4px;
}

.invalid {
  border: 2px solid red;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: transform 0.1s ease-in-out, opacity 0.1s ease-in-out;
}
.modal-enter-from,
.modal-leave-to {
  transform: scale(0.8);
  opacity: 0;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(113, 147, 188, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background-color: var(--pale-white);
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  width: 90%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  max-height: 80vh;
  overflow-y: auto;
}

.form-group {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 8px;
}

input[type="text"],
input[type="email"],
input[type="file"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}

button {
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 8px;
}

.submit-button {
  background-color: var(--blue-primary);
  color: white;
  border-radius: 50px;
  padding: 10px 20px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.cancel-button {
  background-color: var(--dark-coral);
  color: white;
  color: white;
  border-radius: 50px;
  padding: 10px 20px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

@media (max-width: 600px) {
  .modal {
    max-width: 90%;
    padding: 15px;
  }

  .form-actions {
    flex-direction: column;
  }

  button {
    width: 100%;
  }
}

@media (max-width: 400px) {
  .modal {
    max-width: 95%;
    padding: 10px;
  }

  button {
    font-size: 14px;
  }
}
</style>
