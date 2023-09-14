<template>
    <main class="container-fluid">

        <div class="row align-content-center">
            <div class="col-4"></div>
            <div class="col-4">

                <div class="card mt-5" style="width: 30rem;">
                    <div class="card-body">
                        <h5 class="card-title text-center">Register</h5>
                        <form @submit.prevent="register()" id="registerForm" class="col-12">
                            <div class="mb-3">
                                <label for="fname" class="form-label">First name</label>
                                <input type="text" class="form-control" id="fname" v-model="firstName">
                                <div class="text-danger">{{ firstNameError }}</div>
                            </div>
                            <div class="mb-3">
                                <label for="lname" class="form-label">Last name</label>
                                <input type="text" class="form-control" id="lname" v-model="lastName">
                                <div class="text-danger">{{ lastNameError }}</div>
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="email" v-model="email">
                                <div class="text-danger">{{ emailError }}</div>
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" class="form-control" id="password" v-model="password">
                                <div class="text-danger">{{ passwordError }}</div>
                            </div>
                            <p>Choose an image</p>
                            <div class="mb-3 d-flex">
                                <input type="radio" class="d-none" name="image" id="img2" value="2" v-model="image">
                                <label for="img2">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                                        alt="avatar" style="width: 45px; height: auto;">
                                </label>
                                <input type="radio" class="d-none" name="image" id="img3" value="3" v-model="image">
                                <label for="img3">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                                        alt="avatar" style="width: 45px; height: auto;">
                                </label>
                                <input type="radio" class="d-none" name="image" id="img4" value="4" v-model="image">
                                <label for="img4">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
                                        alt="avatar" style="width: 45px; height: auto;">
                                </label>
                                <input type="radio" class="d-none" name="image" id="img5" value="5" v-model="image">
                                <label for="img5">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                                        alt="avatar" style="width: 45px; height: auto;">
                                </label>
                                <input type="radio" class="d-none" name="image" id="img6" value="6" v-model="image">
                                <label for="img6">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                        alt="avatar" style="width: 45px; height: auto;">
                                </label>
                                <div class="text-danger">{{ imageError }}</div>
                            </div>
                            <button type="submit" class="btn btn-primary">Register</button>
                        </form>
                    </div>
                    <p class="ms-3">Already have an account? <RouterLink to="/login" class="text-decoration-none text-info">
                            Login</RouterLink>
                    </p>
                </div>
            </div>
            <div class="col-4"></div>
        </div>

    </main>
</template>

<script>
import http from '../http-common';
import router from '@/router';
import store from '@/store/store';

export default {
    name: 'RegisterView',
    data() {
        return {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            image: '',
            firstNameError: '',
            lastNameError: '',
            emailError: '',
            passwordError: '',
            avatarError: ''
        };
    },
    methods: {
        async register() {
            this.clearErrors();

            // Validate FirstName and LastName
            if (!this.firstName.trim()) {
                this.firstNameError = 'First name cannot be empty';
            } else if (!/^[a-zA-Z]+(\s[a-zA-Z]+)*$/.test(this.firstName)) {
                this.firstNameError = 'First name can contain only letters';
            }
            if (!this.lastName.trim()) {
                this.lastNameError = 'Last name cannot be empty';
            } else if (!/^[a-zA-Z]+(\s[a-zA-Z]+)*$/.test(this.lastName)) {
                this.lastNameError = 'Last name can contain only letters';
            }

            // Validate Email
            if (!this.email.trim()) {
                this.emailError = 'Email cannot be empty';
            } else if (!this.isEmailValid(this.email)) {
                this.emailError = 'Invalid email format.';
            }

            // Validate Password
            if (!this.password) {
                this.passwordError = 'Password is required as format';
            } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(this.password)) {
                this.passwordError = 'Password should contain at least 8 characters, 1 capital letter, 1 small letter, and 1 special character.';
            }

            // Validate Image
            if (!this.image) {
                this.avatarError = 'Please select an avatar.';
            }

            // Check if any validation errors exist
            if (this.hasValidationErrors()) {
                return;
            }

            const result = await http.post('/register', {
                isAdmin: 0,
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                password: this.password,
                image: this.image
            })
            if (result.data.response === true) {
                this.$toast.success(`Welcome ${this.firstName}, you are registered!`, {
                    position: 'top-right',
                    duration: 3000
                });
                store.dispatch('setToken', result.data.token);
                store.dispatch('setUser', result.data.user);
                return router.push('/tasks');
            }

            this.$toast.error('Ups, something went wrong! Try again!', {
                position: 'top-right',
                duration: 3000
            });
            router.push('/register');
        },
        isEmailValid(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        },

        // Add a method to clear error messages
        clearErrors() {
            this.firstNameError = '';
            this.lastNameError = '';
            this.emailError = '';
            this.passwordError = '';
            this.imageError = '';
        },

        // Add a method to check if any validation errors exist
        hasValidationErrors() {
            return (
                this.firstNameError ||
                this.lastNameError ||
                this.emailError ||
                this.passwordError ||
                this.imageError
            );
        },
        isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        },

        // Add a method to clear error messages
        registerClearErrors() {
            this.firstNameError = '';
            this.lastNameError = '';
            this.emailError = '';
            this.passwordError = '';
            this.imageError = '';
        },

        // Add a method to check if any validation errors exist
        validationErrors() {
            return (
                this.firstNameError ||
                this.lastNameError ||
                this.emailError ||
                this.passwordError ||
                this.imageError
            );
        },
    }
}
</script>

<style scoped>
body {
    background: linear-gradient(to right,
            rgba(126, 64, 246, 1),
            rgba(80, 139, 252, 1));
}

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


:checked+label img {
    transform: scale(1.2);
    border-radius: 50%;
    box-shadow: 0 0 5px white;
    z-index: -1;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

@media (max-width: 768px) {
    .card {
      width: 100%; 
    }
    
  }
</style>