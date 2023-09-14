<template>
    <main class="container-fluid">
        <div class="row align-content-center">
            <div class="col-4"></div>
            <div class="col-4">
                <div class="card mt-5" style="width: 32rem;">
                    <div class="card-header text-center">
                        <h3 style="font-size: 36px;">Change Password</h3>
                    </div>

                    <div class="form-group text-light">
                        <label for="currentPassword" class="label-spacing">Current Password</label>
                        <input v-model="currentPassword" id="currentPassword" type="password" class="form-control">
                        <span v-if="passwordError" class="text-danger">{{ passwordError }}</span>
                    </div>
                    <div class="form-group text-light">
                        <label for="newPassword" class="label-spacing">New Password</label>
                        <input v-model="newPassword" id="newPassword" type="password" class="form-control">
                    </div>
                    <div class="form-group text-light">
                        <label for="confirmPassword" class="label-spacing">Confirm Password</label>
                        <input v-model="confirmPassword" id="confirmPassword" type="password" class="form-control">
                        <span v-if="confirmPasswordError" class="text-danger">{{ confirmPasswordError }}</span>
                    </div>
                    <br>
                    <div class="card-footer d-flex justify-content-left">
                        <button class="btn btn-info border" @click="savePassword">Save</button>&nbsp;
                        <button class="btn btn-danger border" @click="cancelChangePassword">Cancel</button>
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
    name: 'ChangePassword',
    data() {
        return {
            user: {},
            id: null,
            passwordError: '',
            confirmPasswordError: '',
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        };
    },
    created() {
        this.id = this.$store.state.user.id;
    },
    methods: {
        async savePassword() {

            const response = await http.post(`/api/login/user`, {
                email: store.state.user.email,
                password: this.currentPassword,
            });

            if (response.data.response) {
                this.passwordError = '';
            } else {
                this.passwordError = 'Current password is incorrect';
                return;
            }


            if (this.newPassword.length < 8) {
                this.confirmPasswordError = 'New password must be at least 8 characters';
                return;
            } else {
                this.confirmPasswordError = '';
            }

            const changePasswordResponse = await http.patch(`/api/change-password/${this.id}`, {
                currentPassword: this.currentPassword,
                newPassword: this.newPassword,
            });

            if (changePasswordResponse.status === 200) {
                this.$toast.success('Password updated!',  {
                        position: 'top-right',
                        duration: 3000 });
                router.push('/edit-profile');
            } else {
                this.$toast.error('Failed to update password',  {
                        position: 'top-right',
                        duration: 3000 });
            }
        },
        cancelChangePassword() {
            this.currentPassword = '';
            this.newPassword = '';
            this.confirmPassword = '';
            this.$router.push('/edit-profile');
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
  