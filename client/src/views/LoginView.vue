<template>
    <div class="home">
    <main class="container-fluid">

        <div class="row align-content-center ">
            <div class="col-4"></div>
            <div class="col-md-8 col-sm-12">

                <div class="card mt-5" style="width: 30rem;">
                    <div class="card-header btn-group mt-2" role="group" aria-label="Basic example">
                        <button class="btn btn-primary btn-active" id="btn-user" type="button" @click="showUser()">
                            User
                        </button>
                        <button class="btn btn-primary" id="btn-admin" type="button" @click="showAdmin()">
                            Admin
                        </button>
                    </div>
                    <img src="../assets/icon.webp" class="card-img-top" alt="...">
                    <div class="d-block" id="userForm">
                        <div class="card-body">
                            <h5 class="card-title text-center">User Login</h5>
                            <form @submit.prevent="userLogin()" id="userForm" class="col-12">
                                <div class="mb-3">
                                    <label for="emailUser" class="form-label">Email</label>
                                    <input type="email" class="form-control" name="email" id="emailUser" v-model="email">
                                    <div class="text-danger">{{ emailError }}</div>
                                </div>
                                <div class="mb-3">
                                    <label for="passwordUser" class="form-label">Password</label>
                                    <input type="password" class="form-control" name="password" id="passwordUser"
                                        v-model="password">
                                    <div class="text-danger">{{ passwordError }}</div>
                                </div>
                                <div class="row">
                                    <div class="col-md-2">
                                        <button type="submit" class="btn btn-success border-white">Login</button>
                                    </div>

                                    <div class="col-md-2">
                                        <button type="button" class="btn btn-danger border-white"
                                            @click="clearFields()">Clear</button>
                                    </div>
                                </div>

                            </form>
                        </div>
                        <p class="ms-3">Don't have an account? <RouterLink to="/register"
                                class="text-decoration-none text-info">Register</RouterLink>
                        </p>
                    </div>
                    <div class="d-none" id="adminForm">
                        <div class="card-body">
                            <h5 class="card-title text-center">Admin Login</h5>
                            <form @submit.prevent="adminLogin()" id="adminForm" class="col-12">
                                <div class="mb-3">
                                    <label for="emailAdmin" class="form-label">Email</label>
                                    <input type="email" class="form-control" name="email" id="emailAdmin" v-model="email">
                                    <div class="text-danger">{{ emailError }}</div>
                                </div>
                                <div class="mb-3">
                                    <label for="passwordAdmin" class="form-label">Password</label>
                                    <input type="password" class="form-control" name="password" id="passwordAdmin"
                                        v-model="password">
                                    <div class="text-danger">{{ passwordError }}</div>
                                </div>
                                <div class="row">
                                    <div class="col-md-2">
                                        <button type="submit" class="btn btn-success border-white">Login</button>
                                    </div>
                                    <div class="col-md-2">
                                        <button type="button" class="btn btn-danger border-white"
                                            @click="clearFields()">Clear</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-4"></div>
        </div>
    </main>
    </div>
</template>

<script>
import router from "@/router";
import http from "../http-common";
import store from '../store/store'

export default {
    name: 'LoginView',
    data() {
        return {
            email: '',
            password: '',
            emailError: '',
            passwordError: ''
        }
    },
    methods: {
        showUser() {
            const userForm = document.querySelector('#userForm');
            if (userForm.classList.contains('d-none')) {
                userForm.classList.remove('d-none');
                userForm.classList.add('d-block');
            }
            const adminForm = document.querySelector('#adminForm');
            if (adminForm.classList.contains('d-block')) {
                adminForm.classList.remove('d-block');
                adminForm.classList.add('d-none');
            }
            const btnUser = document.querySelector('#btn-user');
            const btnAdmin = document.querySelector('#btn-admin');
            btnUser.classList.add('btn-active');
            btnAdmin.classList.remove('btn-active');
        },
        showAdmin() {
            const userForm = document.querySelector('#userForm');
            if (userForm.classList.contains('d-block')) {
                userForm.classList.remove('d-block');
                userForm.classList.add('d-none');
            }
            const adminForm = document.querySelector('#adminForm');
            if (adminForm.classList.contains('d-none')) {
                adminForm.classList.remove('d-none');
                adminForm.classList.add('d-block');
            }
            const btnUser = document.querySelector('#btn-user');
            const btnAdmin = document.querySelector('#btn-admin');
            btnAdmin.classList.add('btn-active');
            btnUser.classList.remove('btn-active');
        },
        async userLogin() {

            this.emailError = '';
            this.passwordError = '';
            if (!this.email) {
                this.emailError = 'Email cannot be empty';
            } else if (!this.isValidEmail(this.email)) {
                this.emailError = 'Enter a valid email';
            }
            if (!this.password) {
                this.passwordError = 'Password cannot be empty';
            }
            if (this.emailError || this.passwordError) {
                return;
            }

            const result = await http.post("/login/user", {
                email: this.email,
                password: this.password
            });
            if (result.data.response === true) {
                store.dispatch('setToken', result.data.token);
                store.dispatch('setUser', result.data.user);
                this.$toast.success('You are logged in!', {
                    position: 'top-right',
                    duration: 3000
                });
                return router.push('/tasks');
            } else {
                this.$toast.error('Email or password incorrect! Try again!', {
                    position: 'top-right',
                    duration: 3000
                });
                router.push('/login');
            }
        },
        async adminLogin() {

            this.emailError = '';
            this.passwordError = '';
            if (!this.email) {
                this.emailError = 'Email cannot be empty';
            } else if (!this.isValidEmail(this.email)) {
                this.emailError = 'Enter a valid email';
            }
            if (!this.password) {
                this.passwordError = 'Password cannot be empty';
            }
            if (this.emailError || this.passwordError) {
                return;
            }

            const result = await http.post("/login/admin", {
                email: this.email,
                password: this.password
            });
            if (result.data.response === true) {
                store.dispatch('setToken', result.data.token);
                store.dispatch('setUser', result.data.user);
                this.$toast.success('You are logged in!', {
                    position: 'top-right',
                    duration: 3000
                });
                return router.push('/tasks');
            }
            else {
                this.$toast.error('Email or password incorrect! Try again!', {
                    position: 'top-right',
                    duration: 3000
                });
                router.push('/login');
            }
        },
        clearFields() {
            this.email = '';
            this.password = '';
            this.emailError = '';
            this.passwordError = '';
        },
        isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        },
    },

}


</script>

<style scoped>
.btn-primary {
    background-color: #b592db;
    color: white;
    border: 1px solid white;
}

.btn-primary:hover {
    border: #9b61df 1px solid;
    background-color: #9b61df;
}

.btn-active {
    background-color: #8d2ff8;
}

.card {
    background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2));
    border: 2px solid rgba(255, 255, 255, 0.05);
    border-radius: 2em;
    background-clip: padding-box;
    box-shadow: 10px 10px 10px rgba(40, 50, 70, 0.03);
    color: white;
    padding-left: 10px;
    padding-right: 10px;
}

.card-img-top {
    width: 230px;
    height: 230px;
    margin: 0;
    align-self: center;
    background-color: transparent;
}

label img {
    margin: 5px;
}

@media (max-width: 768px) {
    .col-md-2,
    .col-md-8 {
      width: 100%; /* Full width for smaller screens */
    }
  
    .btn-group {
      flex-direction: column; /* Stack buttons vertically on smaller screens */
    }
  
    .card {
      width: 90%; /* Adjust card width for smaller screens */
    }
  
    .card-img-top {
      width: 100%; /* Make the image fill the card width */
      height: auto; /* Maintain aspect ratio */
    }
  
    /* Adjust the background color of the navbar and body for smaller screens */
    .navbar {
      background-color: #9b61df; /* Change the navbar background color */
    }
  
    body {
      background-color: #f8f8f8; /* Change the body background color */
    }
  }
</style>