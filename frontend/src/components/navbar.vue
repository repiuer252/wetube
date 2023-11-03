<template>
    <div class="fixed-top">
      <nav class="flex">
        <div class="navbar_left flex">
          <img src="../assets/photo/dark_mode/menu_icon.png" alt="menu_icon" class="menu_icon" />
          <router-link :to="{ name: ['IndexUser'] }">
            <h3>WeTube</h3>
          </router-link>
        </div>
        <div class="navbar_middle flex">
        </div>
        <div class="navbar_right flex">
          <div v-if="authenticate" class="btn btn-outline-danger" v-on:click="signout()">
            <p class="m-0">Sign Out</p>
          </div>
        </div>
      </nav>
    </div>
</template>

<script>

export default {
  data(){
    return {
      authenticate : localStorage.getItem('user-token') || false
    }
  },
    methods : {
      signout() {
        localStorage.removeItem("user-token");
        this.$router.push("/");
      },
  }
}
</script>
