# Vue Job Listings App

A simple job listing application built with Vue 3, TypeScript, and Pinia for state management. This app allows users to browse job postings, filter them by category, view job details, and submit applications.

## 🚀 Features
- 🏗 Built with Vue 3 + Composition API  
- 🔍 Job listing with category filters  
- 📌 Vue Router for navigation  
- 🌐 Fetch job data from a mock API  
- 📦 State management using Pinia  
- ✅ Unit tests with Vitest  
- 📱 Mobile-friendly UI  

---

## 🛠️ Setup Instructions  

### 1️⃣ Clone the Repository  

git clone https://github.com/yourusername/vue-job-listings.git
cd vue-job-listings

### 2️⃣ Install Dependencies
npm install

### 3️⃣ Run the Development Server
npm run dev
The app will be available at http://localhost:5173/.

### 4️⃣ Run Unit Tests
npx vitest

## 📌 Approach
### Project Structure
The project follows a modular architecture with reusable components:

``` src/
│── components/   # UI components (JobCard.vue, JobList.vue, etc.)
│── views/        # Page views (JobList.vue, JobDetail.vue)
│── store/       # Pinia store for state management
│── router/       # Vue Router configuration
│── assets/       # Static assets (CSS, images)
│── tests/        # Unit tests using Vitest
│── main.ts       # App entry point
│── App.vue       # Root component
```

## State Management
Used Pinia to manage job listings and filters efficiently.

## Routing
Used Vue Router with two main routes:
/jobs → Displays job listings.
/jobs/:id → Shows job details.

## Testing
Used Vitest for unit tests to ensure component correctness.

## 🎯 Deployment
To deploy, use Vercel, Netlify, or GitHub Pages. Example with Netlify:
npm run build
netlify deploy

📩 Contact
For questions or suggestions, feel free to reach out! 🚀
