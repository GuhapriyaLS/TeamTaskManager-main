<template>
    <main class="container-fluid">
        <div class="row align-content-center">
            <div class="col-4"></div>
            <div class="col-4">
                <div class="card mt-5" style="width: 30rem;">
                  <div class="card-header text-center">
                    <h3 style="font-size: 36px;">User Profile</h3>
                  </div>
                    <div class="card-body text-center">
                        <img v-if="store.state.user" :src="store.state.user.image" style="width: 150px; height: auto;"
                            alt="User Image">
                    </div>
                    <div class="card-text">
                        <div v-if="store.state.user" class="userprofile-text" >
                            <p><strong>First Name : </strong>{{ store.state.user.firstName }}</p>
                            <p><strong>Last Name : </strong>{{ store.state.user.lastName }}</p>
                            <p><strong>Email : </strong>{{ store.state.user.email }}</p>
                        </div><br>
                        <div class="card-footer text-left" >
                            <router-link :to="{ name: 'edit-profile' }" class="btn btn-info border btn-editProfile">Edit Profile</router-link>&nbsp;
                            <EditProfileCard v-if="showEditProfileCard" @close="hideEditProfile" />
                            <button class="btn btn-danger border btn-logout" @click="confirmLogout">Logout</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-4"></div>
        </div>
    </main>
</template>

<script>
import Store from '../store/store'
import Swal from 'sweetalert2';

export default {
    name: 'UserProfile',
    data() {
      var data=   {
            store: Store,
            showEditProfileCard: false,
        }
        return data;
    },
    methods: {
    async confirmLogout() {
      const { value } = await Swal.fire({
        title: 'Logout Confirmation',
        text: 'Are you sure you want to log out?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, logout',
      });

      if (value) {
        this.logout();
      }
    },
    logout() {
      this.$router.push('/');
      this.store.dispatch('setToken', null);
      this.store.dispatch('setUser', '');
      this.$toast.open({
        message: 'Logged out successfully!',
        position: 'top-right',
        type: 'default',
      });
    },
    showEditProfile() {
      this.showEditProfileCard = true;
    },
    hideEditProfile() {
      this.showEditProfileCard = false;
    },
  }
}
</script>

<style scoped>
/* Media Queries for Responsive Design */
@media (max-width: 576px) {
  /* Adjust card width on small screens */
  .card {
    width: 100%;
    margin: 0;
  }

  /* Adjust font size for smaller screens */
  .profile-header {
    font-size: 24px;
  }

  .userprofile-text {
    font-size: 16px;
    padding-left: 0; /* Remove left padding */
  }
}

/* Additional Styles */
body {
  background: linear-gradient(to right, rgba(126, 64, 246, 1), rgba(80, 139, 252, 1));
}

.card {
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2));
  border: 2px solid rgba(255, 255, 255, 0.05);
  border-radius: 2em;
  background-clip: padding-box;
  box-shadow: 10px 10px 10px rgba(40, 50, 70, 0.03);
  color: white;
}

.profile-header {
  font-size: 36px;
}

.profile-image {
  width: 150px;
  height: auto;
}

.userprofile-text {
  font-size: 18px;
  padding-left: 30px;
}
</style>
