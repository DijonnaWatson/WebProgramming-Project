<script setup lang="ts">
// import { ref } from 'vue';
</script>

<template>
  <main>
    <section class="hero">
      <div class="hero-content">
        <h1 class="app-title">Welcome to My Fitness App</h1>
        <p class="app-subtitle">Your journey to a healthier life starts here.</p>
        <div class="cta-buttons">
          <RouterLink to="/signup" button class="cta-button">Get Started</RouterLink>
          <button class="cta-button secondary">Learn More</button>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
main {
  padding: 0;
  text-align: center;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to right, #f8f9fa, #e9ecef);
}

.hero {
  background: url('https://img.freepik.com/premium-photo/soft-blurred-gym-background-active-fitness-equipment-strong-workout-mood_217468-30272.jpg') no-repeat center center/cover;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.hero-content {
  background: rgba(0, 0, 0, 0.5);
  padding: 2rem;
  border-radius: 1rem;
}

.app-title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.app-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
}

.cta-button {
  padding: 0.75rem 1.5rem;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.cta-button.secondary {
  background-color: #007BFF;
}

.cta-button:hover {
  transform: translateY(-0.1rem);
}

.cta-button:active {
  transform: translateY(0);
}
</style>