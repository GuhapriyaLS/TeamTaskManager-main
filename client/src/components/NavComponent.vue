<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-transparent">
    <div class="container-fluid">
      <h1 class="navbar-heading">Team Task Manager</h1>
      <button class="navbar-toggler ml-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav custom-menu ml-auto">
          <router-link to="/" id="home-link" class="nav-link" :class="{ 'active': $route.path === '/' }"> Home
          </router-link>
          <router-link to="/about" id="about-link" class="nav-link"
            :class="{ 'active': $route.path === '/bout' }">About</router-link>
          <router-link v-if="!store.state.isLoggedIn" to="/login" id="login-link" class="nav-link"
            :class="{ 'active': $route.path === '/login' }"> Login </router-link>
          <router-link v-if="!store.state.isLoggedIn" to="/register" id="register-link" class="nav-link"
            :class="{ 'active': $route.path === '/register' }"> Register </router-link>
          <router-link v-if="store.state.isLoggedIn" to="/tasks" id="tasks-link" class="nav-link"
            :class="{ 'active': $route.path === '/tasks' }"> Tasks </router-link>
          <router-link v-if="store.state.isLoggedIn" to="/user-profile" class="nav-link"
            :class="{ 'active': $route.path === '/user-profile' }">{{ store.state.user.firstName }}</router-link>
        </div>
        <span v-if="store.state.isLoggedIn" class="d-flex"><img :src="store.state.user.image"
            style="width: 40px; height: auto;" alt="avatar"> </span>
      </div>
    </div>
  </nav>
</template>
  
<script>
import Store from '../store/store'

export default {
  name: 'NavComponent',
  data() {
    return {
      store: Store
    }
  },
  methods: {
  }
}
</script>
  
<style scoped>
.navbar {
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1));
}

.custom-menu {
  margin-left: auto;
}

.navbar-heading {
  font-size: 22px;
  color: whitesmoke;
}

@media (max-width: 768px) {
  .navbar-heading {
    font-size: 18px; /* Reduce font size for smaller screens */
  }

  .navbar-toggler {
    background-color: #9b61df; /* Change the toggle button color */
  }
}
</style>