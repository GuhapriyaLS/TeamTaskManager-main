<template>
    <main class="container-fluid">
        <div class="row align-content-center">
            <div class="col-4"></div>
            <div class="col-4">
                <div class="card mt-5" style="width: 32rem;">
                    <div class="card-header text-center">
                        <h3 style="font-size: 36px;">Edit User Profile</h3>
                    </div>
                    <div class="text-center">
                        <img v-if="store.state.user" :src="store.state.user.image" style="width: 150px; height: auto; "
                            alt="User Image">
                    </div>
                    <div class="form-group text-light">
                        <label for="firstName" class="label-spacing">First Name</label>
                        <input v-model="firstName" id="firstName" type="text" class="form-control">
                        <div class="text-danger">{{ firstNameError }}</div>
                    </div>
                    <div class="form-group text-light ">
                        <label for="lastName" class="label-spacing">Last Name</label>
                        <input v-model="lastName" id="lastName" type="text" class="form-control">
                        <div class="text-danger">{{ lastNameError }}</div>
                    </div>
                    <div class="form-group text-light">
                        <label for="email" class="label-spacing">Email</label>
                        <input v-model="email" id="email" type="text" class="form-control">
                        <div class="text-danger">{{ emailError }}</div>
                    </div>
                    <br>
                    <div class="card-footer d-flex justify-content-between">
                        <!-- <router-link to="/change-password" class="btn btn-outline-light border">Change Password</router-link> -->
                        <div>
                            <button class="btn btn-info border" @click="saveProfile">Save</button>&nbsp;
                            <button class="btn btn-danger border" @click="cancelEdit">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
  
<script>
import store from '../store/store';
import router from '@/router';
import http from '../http-common';

export default {
    name: 'EditProfileCard',
    data() {
        return {
            user: {},
            firstName: '',
            lastName: '',
            email: '',
            store: store,
            firstNameError: '',
            lastNameError: '',
            emailError: '',
        };
    },
    created() {
        // Retrieve user information from the store and set it in data
        this.firstName = store.state.user.firstName;
        this.lastName = store.state.user.lastName;
        this.email = store.state.user.email;
    },
    methods: {
        async saveProfile() {
            try {
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
                    this.emailError = 'Enter a valid email';
                }

                if (this.hasValidationErrors()) {
                    return;
                }

                const result = await http.patch(`/users/${store.state.user.id}`, {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                });

                if (result) {
                    // Update the Vuex store state with the new user data
                    this.store.commit('setUser', {
                        ...store.state.user,
                        firstName: this.firstName,
                        lastName: this.lastName,
                        email: this.email,
                    });

                    this.$toast.success('User profile updated!', {
                        position: 'top-right',
                        duration: 3000 });
                    setTimeout(() => {
                        router.push('/user-profile');
                    });
                } else {
                    this.$toast.error('Oops! Something went wrong.');
                }
            } catch (error) {
                console.error(error);
                this.$toast.error('Oops! Something went wrong.');
            }
        },
        cancelEdit() {
            this.firstName = '';
            this.lastName = '';
            this.email = '';
            this.$router.push('/user-profile');
        },
        isEmailValid(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        },
        clearErrors() {
            this.firstNameError = '';
            this.lastNameError = '';
            this.emailError = '';
        },
        hasValidationErrors() {
            return this.firstNameError || this.lastNameError || this.emailError;
        },
    },
}
</script>
  
<style scoped>
body {
    background: linear-gradient(to right,
            rgba(126, 64, 246, 1),
            rgba(80, 139, 252, 1));
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

.label-spacing {
    margin-bottom: 10px;
    margin-top: 10px;
    font-size: 18px;
}
</style>
  