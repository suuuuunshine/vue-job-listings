<template>
  <div class="view-container">
    <h2 class="title">About us</h2>
    <p>
      At PixelCrafters, we're not just building the future — we're shaping it
      together. We believe in fostering an environment where innovation thrives,
      collaboration is key, and every voice is heard. Whether you're a seasoned
      expert or just starting your career, we offer a space where you can grow,
      challenge yourself, and make an impact. Our team is passionate, diverse,
      and driven by a shared mission: to create cutting-edge technology that
      solves real-world problems. When you join us, you're not just taking on a
      job — you're becoming part of a community dedicated to pushing boundaries,
      embracing new ideas, and constantly evolving. Here, you'll find
      opportunities for personal and professional growth, the chance to work on
      exciting projects, and the support you need to succeed. We value
      creativity, respect, and the power of collaboration, and we are committed
      to building a workplace where every individual feels empowered,
      appreciated, and part of something bigger. So, why do you want to work for
      us? Because here, you'll be more than just an employee — you'll be a vital
      part of a team that's transforming the tech world, one innovation at a
      time. Ready to make an impact? Let's build the future together.
    </p>
    <div v-if="job" class="job-section">
      <h2 class="title">{{ job.title }}</h2>
      <p>{{ job.description }}</p>
      <h2 class="perks-title">Perks of Joining PixelCrafters</h2>
      <div class="perks-list">
        <ul>
          <li v-for="(perk, index) in perks" :key="index" class="perk-item">
            <div class="perk-title-wrapper">
              <span class="material-icons">favorite</span>
              <h3 class="perk-title">{{ perk.title }}</h3>
            </div>
            <p class="perk-description">{{ perk.description }}</p>
          </li>
        </ul>
      </div>
      <button class="floating-button" @click="applyToJob">Apply now!</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useJobStore } from "../stores/jobStore";
import { useModalStore } from "../stores/jobApplicationModalStore";
import { computed, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";

const modalStore = useModalStore();
const jobsStore = useJobStore();
const route = useRoute();
const router = useRouter();

const job = computed(() => {
  return jobsStore.jobs.find((j) => j.id === Number(route.params.id));
});

watchEffect(() => {
  if (!job.value) {
    router.push({ name: "404" });
  }
});

const applyToJob = () => {
  const jobValue = job.value;
  if (jobValue) {
    modalStore.openModal(jobValue);
  }
};

const perks = [
  {
    title: "Competitive Salary & Performance Bonuses",
    description:
      "We offer attractive compensation packages with performance-based bonuses, recognizing your contributions to our success.",
  },
  {
    title: "Flexible Work Environment",
    description:
      "Whether you prefer working from home or in the office, we provide flexibility to balance your professional and personal life.",
  },
  {
    title: "Growth Opportunities",
    description:
      "At PixelCrafters, your career is important to us. We encourage continuous learning and offer ample opportunities for growth through mentorship, workshops, and training.",
  },
  {
    title: "Health & Wellness Benefits",
    description:
      "We care about your well-being. Our comprehensive health plans include medical, dental, and vision coverage, as well as mental health support and wellness programs.",
  },
  {
    title: "Generous Time Off",
    description:
      "Enjoy a generous vacation policy, paid sick leave, and paid holidays, ensuring you have the time to recharge and spend with loved ones.",
  },
  {
    title: "Collaborative & Inclusive Culture",
    description:
      "Work with a diverse and talented team that fosters creativity, mutual respect, and collaboration. We celebrate every team member's unique perspective and encourage open communication.",
  },
  {
    title: "Cutting-Edge Projects",
    description:
      "Get the chance to work on exciting, high-impact projects that challenge the status quo and make a difference in the tech world.",
  },
  {
    title: "Team Events & Social Activities",
    description:
      "We believe in building strong relationships, both in and out of the office. From team-building activities to happy hours, there's always a chance to connect and have fun.",
  },
  {
    title: "Retirement Plans",
    description:
      "Plan for the future with our competitive retirement savings plans to help secure your long-term financial goals.",
  },
  {
    title: "Innovative Tools & Technology",
    description:
      "You'll have access to the latest tools and technologies to make your job easier and more exciting, keeping you at the forefront of the tech industry.",
  },
  {
    title: "Supportive Leadership",
    description:
      "Our leadership is committed to providing the guidance, resources, and opportunities needed for your success.",
  },
];
</script>
<style lang="scss" scoped>
.material-icons {
  font-size: 16px;
  margin-top: 6px;
  margin-right: 8px;
}

.view-container {
  display: flex;
  flex-direction: column;
  padding: 0 24px;
}

.title {
  margin: 12px 0;
}

.job-section {
  margin-top: 24px;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

ul li {
  align-items: top;
}

.perks-list {
  margin-bottom: 70px;
}

.perks-title {
  margin: 28px 0 12px 0;
}

.perk-title-wrapper {
  display: flex;
}

.perk-item {
  padding: 15px;
  border-radius: 8px;
  transition: background-color 0.3s, box-shadow 0.3s, transform 0.2s;
}

.perk-title {
  font-weight: 600;
  font-size: 1.2em;
  margin: 0;
}

.perk-description {
  margin-top: 5px;
  font-size: 1em;
}

.perk-item:hover {
  background-color: #f0f0f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-5px);
}

@media (max-width: 768px) {
  ul {
    grid-template-columns: 1fr;
  }
}

.floating-button {
  position: fixed;
  bottom: 20px;
  right: 48%;
  padding: 15px 25px;
  background-color: var(--dark-blue);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s;
}

.floating-button:hover {
  background-color: var(--blue-primary);
}
</style>
