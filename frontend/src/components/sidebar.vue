<template>
    <div v-if="authenticate" class="sidebar">
      <div class="shortcut">
        <router-link :to="{ name: ['IndexUser'] }"
          ><img src="../assets/photo/dark_mode/home_icon.png" alt="home" />
          <p>Home</p></router-link
        >
        <router-link :to="{ name: ['explore'] }"
          ><img src="../assets/photo/white_mode/explore_icon.png" alt="Explore" />
          <p>Explore</p></router-link
        >
        <hr />
        <router-link :to="{name:['Upload']}"><img src="../assets/photo/white_mode/upload_icon.png" alt="upload" />Upload</router-link>
        <router-link :to="{ name: ['history'] }"
          ><img src="../assets/photo/dark_mode/history_icon.png" alt="history" />
          <p>History</p></router-link
        >
        <router-link :to="{ name: ['watch_later'] }"
          ><img src="../assets/photo/white_mode/time_icon.png" alt="Watch Later" />
          <p>Watch Later</p></router-link
        >
        <router-link :to="{ name: ['playlist'] }"
          ><img src="../assets/photo/white_mode/showmore_icon.png" 
            alt="playlist" />
            <p>Playlist</p>
        </router-link>
      </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      authenticate: localStorage.getItem('user-token') || null
    }
  }
}
</script>
