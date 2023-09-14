<template>
  <NavComponent/>
  <router-view/>
  <FooterComponent/>
</template>

<script>
import NavComponent from './components/NavComponent.vue';
import FooterComponent from './components/FooterComponent.vue';


export default {
  components: {
    NavComponent,
    FooterComponent
  },
  computed: {
      route(){
        return this.$route.name;
      }
    }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

*{
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', sans-serif;
}

body{
    background: linear-gradient(
    to right,
    rgba(126, 64, 246, 1),
    rgba(80, 139, 252, 1)
    );
}

</style>
