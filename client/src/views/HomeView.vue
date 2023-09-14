<template>
  <div class="home">
    <main class="container-fluid">
      <div class="row align-items-center mt-5">
        <div class="col-md-6 text-white text-center">
          <h1 class="display-3 title">Welcome to Team task manager</h1>
          <p class="display-5 fs-5">Efficiently manage and Elevate teamwork with seamless task management</p>
        </div>
        <div class="col-md-6 text-center">
          <img class="custom-img-size" src="../assets/icon.webp">
        </div>
      </div>
    </main>
  </div>
</template>

<script>

export default {
  name: 'HomeView',
  watch: {
    $route: {
      immediate: true,
      handler() {
        document.title = 'Team Task Manager';
      }
    }
  }
}
</script>

<style scoped>
.title {
  font-weight: 200;
}

.custom-img-size {
  width: 90%;
  max-width: 100%;
  height: auto;
}

/* Media Query for Smaller Screens */
@media (max-width: 768px) {
  .display-3 {
    font-size: 2.5rem; /* Adjust the font size for smaller screens */
  }

  .display-5 {
    font-size: 1.5rem; /* Adjust the font size for smaller screens */
  }

  .custom-img-size {
    width: 80%; /* Adjust image size for smaller screens */
  }
}
</style>
