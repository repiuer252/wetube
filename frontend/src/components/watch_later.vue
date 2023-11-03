<template>
  <div>
    <!-- <div id="overlay">
      <div id="form_input_video">
        <img src="../assets/photo/white_mode/close_icon.png" v-on:click="off()" />
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
      </div> -->
    <!-- </div> -->

    <!-- <nav class="flex">
        <div class="navbar_left flex">
            <img src="../assets/photo/dark_mode/menu_icon.png" alt="menu_icon" class="menu_icon">
            <h3>WeTube</h3>
        </div>
        <div class="navbar_middle flex">
            <div class="search-box flex">
                <input type="text" placeholder="search">
                <img src="../assets/photo/dark_mode/search_icon.png" alt="search_icon"> 
            </div>
        </div>
        <div class="navbar_right flex"></div>
    </nav> -->
    <navbar></navbar>

    <sidebar></sidebar>

    <!-- <div class="sidebar">
        <div class="shortcut">
            <a href="#"><img src="../assets/photo/dark_mode/home_icon.png" alt="home"><p>Home</p></a>
            <router-link :to="{ name: ['explore'] }"><img src="../assets/photo/white_mode/explore_icon.png" alt="Explore"><p>Explore</p></router-link>
            <router-link :to="{ name: ['subscription'] }"><img src="../assets/photo/white_mode/subscription_icon.png" alt="Subscription"><p>Subscription</p></router-link>
            <hr>
            <router-link :to="{ name: ['library'] }"><img src="../assets/photo/white_mode/library_icon.jpg" alt="library"><p>Library</p></router-link>
            <a href="#" v-on:click="on()"><img src = "../assets/photo/white_mode/upload_icon.png" alt = "upload">Upload</a>
            <router-link :to="{ name: ['history'] }"><img src="../assets/photo/dark_mode/history_icon.png" alt="history"><p>History</p></router-link>
            <router-link :to="{ name: ['your_video'] }"><img src="../assets/photo/white_mode/your_video_icon.png" alt="Your Video"><p>Your Video</p></router-link>
            <router-link :to="{ name: ['watch_later'] }"><img src="../assets/photo/white_mode/time_icon.png" alt="Watch Later"><p>Watch Later</p></router-link>
            <router-link :to="{ name: ['playlist'] }"><img src="../assets/photo/white_mode/showmore_icon.png" alt="playlist"><p>Playlist</p></router-link>            
            <hr>
        </div>

        <div class="subscriptions">
            <h6>Subscriptions</h6>
        </div>
    </div>


tempat taruh video------- -->
    <div class="menuAdd flex-column bg-dark min-vh-100 mt-5">
      <div class="mx-auto mt-3 title">
        <p
          style="
            font-family: 'The Nautigal', cursive;
            font-weight: bold;
            background: linear-gradient(to right, purple, red, yellow);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          "
        >
          Your Watch Later List
        </p>
      </div>
      <hr
        class="hrWatchLater mx-auto p-0"
        style="
          height: 2px;
          background: linear-gradient(
            to right,
            yellow,
            white,
            lightblue,
            aqua,
            purple
          );
          opacity: 1;
        "
      />
      <div style="display: grid" class="mx-5 gridWH">
        <div
          v-for="item in video"
          :key="item.id"
          class="wrapper text-light my-3"
          style="display: flex"
        >
          <div class="widthVideo">
            <router-link :to="{ path: '/video/' + item.Video.id }">
              <img
                class="mx-auto w-100"
                style="height: 170px"
                v-if="item.thumbnail"
                :src="getImgUrl(item.thumbnail)"
              />
              <img
                class="mx-auto w-100"
                style="height: 170px"
                v-else
                :src="getImgUrl(item.path)"
              />
            </router-link>
          </div>
          <div class="videoInfo mx-2">
            <p style="font-size: 20px; color: orange">{{ item.Video.name }}</p>
            <p>{{ item.Video.User.username }}</p>
            <small>{{ item.Video.description }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import sidebar from "./sidebar.vue";
import navbar from "./navbar.vue";

export default {
  name: "watch_later",
  components: { sidebar, navbar },
  data() {
    return {
      video: [],
    };
  },
  created() {
    this.getVideo();
  },
  methods: {
    async getVideo() {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_BACKEND}/watchLater`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("user-token")}`,
            },
          }
        );
        this.video = response.data.data;
      } catch (err) {
        console.log(err);
      }
    },
    getImgUrl(pic) {
      const image = pic.Video.path.split("/");
      image.splice(6, 0, "w_200,h_200,c_scale");
      return image.join("/").slice(0, -4) + ".jpg";
    },
    signOut() {
      localStorage.removeItem("user-token");
      this.$router.push("/");
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
      document.getElementById("overlay").style.display = "none";
      document.getElementById("overlay1").style.display = "none";
      document.getElementById("overlay2").style.display = "none";
    },
    // listVideo(item) {
    //   if (item.playList.length == 0) {
    //     this.playlist = [];
    //   } else {
    //     this.playlist = item.playList;
    //   }
    // },
    // listUploadedVideo(item) {
    //   if (item.length == 0) {
    //     this.playlist = [];
    //   } else {
    //     this.playlist = item;
    //   }
    // },
    // getWatchLaterUrl(item) {
    //   if (item.path) {
    //     const image = item.path.split("/");
    //     image.splice(6, 0, "w_200,h_200,c_scale");
    //     return image.join("/").slice(0, -4) + ".jpg";
    //   } else {
    //     const image = item.Video.path.split("/");
    //     image.splice(6, 0, "w_200,h_200,c_scale");
    //     return image.join("/").slice(0, -4) + ".jpg";
    //   }
    // },
  },
};
</script>
