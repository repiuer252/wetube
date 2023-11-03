<template>
  <div>
    <navbar></navbar>
  <!-- <nav class="flex">
      <div class="navbar_left flex">
        <img src="../assets/photo/dark_mode/menu_icon.png" alt="menu_icon" class="menu_icon" />
        <h3>WeTube</h3>
      </div>
      <div class="navbar_middle flex">
        <div class="search-box flex">
          <input type="text" placeholder="search" />
          <img src="../assets/photo/dark_mode/search_icon.png" alt="search_icon" />
        </div>
      </div>
      <div class="navbar_right flex">
        <div class="btn btn-outline-danger" v-on:click="signout()">
          <p class="m-0">Sign Out</p>
        </div>
      </div>
    </nav> -->
      <sidebar></sidebar>

    <!-- <div class="sidebar">
      <div class="shortcut">
        <a href="/home"
          ><img src="../assets/photo/dark_mode/home_icon.png" alt="home" />
          <p>Home</p></a
        >
        <router-link :to="{ name: ['explore'] }"
          ><img src="../assets/photo/white_mode/explore_icon.png" alt="Explore" />
          <p>Explore</p></router-link
        >
        <router-link :to="{ name: ['subscription'] }"
          ><img src="../assets/photo/white_mode/subscription_icon.png" alt="Subscription" />
          <p>Subscription</p></router-link
        >
        <hr />
        <router-link :to="{ name: ['library'] }"
          ><img src="../assets/photo/white_mode/library_icon.jpg" alt="library" />
          <p>Library</p></router-link
        >
        <a href="#" v-on:click="on()"><img src="../assets/photo/white_mode/upload_icon.png" alt="upload" />Upload</a>
        <router-link :to="{ name: ['history'] }"
          ><img src="../assets/photo/dark_mode/history_icon.png" alt="history" />
          <p>History</p></router-link
        >
        <router-link :to="{ name: ['your_video'] }"
          ><img src="../assets/photo/white_mode/your_video_icon.png" alt="Your Video" />
          <p>Your Video</p></router-link
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
        <hr />
      </div>

      <div class="subscriptions">
        <h6>Subscriptions</h6>
      </div>
    </div> -->
      <div class="container create_acc mt-5">
          <form method="post" @submit.prevent="register">
            <h1 class="judul">Create WeTube Account</h1>
              <div class="row">
                  <label for="exampleInputEmail1">Username</label>
                  <div class="col">
                    <input type="text" class="form-control" placeholder="Enter Username" v-model="username">
                  </div>
                </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" v-model="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
              </div>
              
              <div class="row">
                <div class="col">
                  <label for="inputState">Gender</label>
                  <select class="form-select" aria-label="Default select example" v-model="gender">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div class="col">
                  <label for="inputState">Birthday</label>
                  <input type="date" v-model="birthday" class="form-control" placeholder="Enter Birthday">
                </div>
              </div>

                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Enter Password" v-model="password">
                </div>

                <div class="form-group">
                  <label for="exampleInputPassword1">Confirm Password</label>
                  <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Confirm Password" v-model="confirm_password">
                </div>

              <small v-if="errorRegister" class="text-danger d-block mb-3">{{ errorRegisterMessage }}</small>
              <button class="btn btn-primary tombol_create_acc mt-3" type="submit">Create Account</button>
            </form>
      </div>
    </div>
</template>
<script>
import axios from "axios";
import sidebar from "./sidebar.vue";
import navbar from "./navbar.vue";

export default {
  components: {sidebar,navbar},
  data(){
    return {
      email: "",
      username: "",
      password: "",
      confirm_password: "",
      birthday: "",
      gender: "",
      errorRegisterMessage: "",
      errorRegister: false
    }
  },
  beforeMount(){
    if(localStorage.getItem('user-token')){
      this.$router.push("/home");
    }
  },
  methods: {
     async register() {
      try {
        console.log(process.env.VUE_APP_BACKEND)
        await axios.post(`${process.env.VUE_APP_BACKEND}/register`, {
          email: this.email,
          username: this.username,
          gender: this.gender,
          password: this.password,
          confirm_password: this.confirm_password,
          birthday: this.birthday,
        });
        this.email = "";
        this.username = "";
        this.gender = "";
        this.password = "";
        this.confirm_password = "";
        this.birthday = "";
        this.$router.push("/");
      } catch (err) {
        this.errorRegister = true
        this.errorRegsiterMessage = err.response.data.error
      }
    },
  }
}
</script>