<template>
  <main class="container-fluid">
    <div class="row align-content-center">
      <div class="img d-flex align-items-center justify-content-center">
        <div class="text text-light">ABOUT</div>
      </div>
      <div class="col-2"></div>
      <div class="col-8">
        <div class="card">
          <p>
            The single-page application offers a streamlined experience, featuring two distinct login roles: admin and
            user. Admins have the authority to assign and edit tasks, while users can update task statuses and personalize
            their profiles. New users can easily register, and the platform fosters efficient task management and
            collaboration. With customizable profiles and robust task management features, the application aims to enhance
            productivity and user engagement in a user-friendly interface.
          </p>
        </div>
      </div>
      <div class="col-2"></div>
    </div>
  </main>
</template>

<script>

export default {
  name: 'AboutView',

}

</script>

<style scoped>
.container-fluid {
  height: 92vh;
}

.img {
  height: 91vh;
  background: linear-gradient(rgba(102, 101, 101, 0.5), rgba(16, 17, 19, 0.5)), url('../assets/bg.jpg');
  background-position: 40% 20%;
  background-size: cover;
}

.text {
  font-size: 5rem;
  font-weight: bolder;
}

.card {
  margin-top: -20vh;
  padding: 20px;
  width: 100%;
  background: rgba(0, 0, 0, .3);
  box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
}

.card p {
  font-size: 17px;
  color: white;
}</style>