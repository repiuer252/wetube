<template>
  <div>
    <!-- <div id="overlay">
      <div id="form_input_video">
        <img
          src="../assets/photo/white_mode/close_icon.png"
          v-on:click="off()"
        />
        <h3>Upload Video</h3>
        <div class="drag-area">
          <div class="icon"><i class="fas fa-cloud-upload-alt"></i></div>
          <header>Drag & Drop to Upload File</header>
          <span>OR</span>
          <button>Browse File</button>
          <input type="file" hidden />
        </div>
        <h3>Title (required)</h3>
        <textarea id="w3review" name="w3review" rows="2" cols="80"></textarea>
        <h3>Description</h3>
        <textarea id="w3review" name="w3review" rows="5" cols="80"></textarea>
        <h3>thumbnail</h3>
        <input type="file" id="myFile" name="filename" />
      </div>
    </div> -->

    <div id="overlay1">
      <div id="form_input_video">
        <img
          src="../assets/photo/white_mode/close_icon.png"
          v-on:click="off()"
        />
        <h3>Sign In</h3>
        <form class="login" @submit.prevent="login" method="post">
          <div class="txt_field">
            <input required v-model="username" type="text" />
            <label>Username</label>
          </div>

          <div class="txt_field">
            <input required v-model="password" type="password" />
            <label>Password</label>
          </div>
          <small v-if="error" class="text-danger d-block mb-3">{{ errorMessage }}</small>
          <!-- <div class="pass">Forget Password ?</div> -->
          <!-- <button type="submit">Login</button> -->
          <button type="submit" class="btn btn-sm btn-light">Login</button>
          <router-link class="d-block sign_up" to="/signup">Create Account</router-link>
        </form>
      </div>
    </div>

    <!-- <div id="overlay2" class="mt-5">
      <div id="form_input_video">
        <img
          src="../assets/photo/white_mode/close_icon.png"
          v-on:click="off()"
        />
        <h3>Create Account</h3>
        <form method="post" @submit.prevent="register">
          <div class="row">
            <div class="col-md-4 mx-auto txt_field">
              <input v-model="email" type="text" required />
              <label>Email</label>
            </div>

            <div class="col-md-4 me-3 mx-auto txt_field">
              <input v-model="username" type="text" required />
              <label>Username</label>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4 me-3 mx-auto txt_field">
              <input v-model="password" type="password" required />
              <label>Password</label>
            </div>

            <div class="col-md-4 me-3 mx-auto txt_field">
              <input type="password" v-model="confirm_password" required />
              <label>Confirm Password</label>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4 me-3 mx-auto txt_field">
              <input v-model="birthday" type="date" required />
              <label>Birthday</label>
            </div>

            <div class="col-md-4 me-3 mx-auto txt_field">
              <select v-model="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <label>Gender</label>
            </div>
          </div>
          <small v-if="errorRegister" class="text-danger d-block mb-3">{{ errorRegisterMessage }}</small>
          <button type="submit" class="btn btn-sm btn-light">Register</button>
        </form>
      </div>
    </div> -->

    <nav class="flex">
      <div class="navbar_left flex">
        <img
          src="../assets/photo/dark_mode/menu_icon.png"
          alt="menu _icon"
          class="menu_icon"
        />
        <h3>WeTube</h3>
      </div>
      <div class="navbar_middle flex">
      </div>
      <div class="navbar_right flex">
        <div class="btn btn-outline-primary" v-on:click="onn()">
          <p class="m-0">Sign In</p>
        </div>
      </div>
    </nav>

    <sidebar></sidebar>

    <!-- <div class="sidebar">
      <div class="shortcut">
        <a href="#"
          ><img src="../assets/photo/dark_mode/home_icon.png" alt="home" />
          <p>Home</p></a
        >
        <a href="#"
          ><img
            src="../assets/photo/white_mode/explore_icon.png"
            alt="Explore"
          />
          <p>Explore</p></a
        >
        <a href="#" v-on:click="onn()"
          ><img
            src="../assets/photo/white_mode/subscription_icon.png"
            alt="Subscription"
          />
          <p>Subscription</p></a
        >
        <hr />
        <a href="#" v-on:click="onn()"
          ><img
            src="../assets/photo/white_mode/library_icon.jpg"
            alt="library"
          />
          <p>Library</p></a
        >
        <a href="#" v-on:click="on()"
          ><img src="../assets/photo/white_mode/upload_icon.png" alt="upload" />
          <p>Upload</p></a
        >
        <a href="#" v-on:click="onn()"
          ><img
            src="../assets/photo/dark_mode/history_icon.png"
            alt="history"
          />
          <p>History</p></a
        >
        <a href="#" v-on:click="onn()"
          ><img
            src="../assets/photo/white_mode/your_video_icon.png"
            alt="Your Video"
          />
          <p>Your Video</p></a
        >
        <a href="#" v-on:click="onn()"
          ><img
            src="../assets/photo/white_mode/time_icon.png"
            alt="Watch Later"
          />
          <p>Watch Later</p></a
        >
        <a href="#"
          ><img
            src="../assets/photo/white_mode/showmore_icon.png" 
            alt="playlist"
          />
          <p>Playlist</p></a
        >
        <hr />
      </div>

      <div class="subscriptions">
        <h6>Subscriptions</h6>
      </div>
    </div> -->

    <!-- ------tempat taruh video------- -->

    <list-video></list-video>
  </div>
</template>
<script>
import axios from "axios";
import listVideo from './listVideo.vue';
import sidebar from './sidebar.vue';

export default {
  name: "main_no_sign_in",
  components: { "list-video":listVideo, sidebar },
  data() {
    return {
      video: [],
      password: "",
      username: "",
      errorMessage:"",
      error:false,
    };
  },
  beforeMount(){
    if(localStorage.getItem('user-token')){
      this.$router.push("/home");
    }
  },
  methods: {
    async login() {
      try {
        const res = await axios.post(`${process.env.VUE_APP_BACKEND}/login`, {
          username: this.username,
          password: this.password,
        });
        this.username = "";
        this.password = "";
        const token = res.data.data;
        localStorage.setItem("user-token", token);
        this.$router.push("/home");
      } catch (err) {
        this.error = true
        this.errorMessage = err.response.data.error
      }
    },
    on() {
      document.getElementById("overlay").style.display = "block";
    },
    onn() {
      document.getElementById("overlay1").style.display = "block";
    },
    onnn() {
      document.getElementById("overlay1").style.display = "none";
      document.getElementById("overlay2").style.display = "block";
    },
    off() {
      // document.getElementById("overlay").style.display = "none";
      document.getElementById("overlay1").style.display = "none";
      // document.getElementById("overlay2").style.display = "none";
    },
  },
};
</script>
