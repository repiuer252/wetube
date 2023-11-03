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
      </div>
    </div> -->
    <navbar></navbar>

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
    </div> -->

    <!-- ------tempat taruh video------- -->

    <div class="container">
      <div
        class="navbar_middle flex mb-5 ms-5"
        v-bind:style="[authenticate ? { 'margin-top': '8%' } : {}]"
      >
        <div class="search-box flex">
          <form method="post" @submit.prevent="search">
            <input type="text" placeholder="search" v-model="name" />
          </form>
        </div>
      </div>
      <div class="video_list" v-for="item in video" :key="item.id">
        <div class="card me-5 flex-row">
          <router-link class="m-2" :to="{ path: '/video/' + item.id }">
            <img v-if="item.thumbnail" :src="getImgUrl(item.thumbnail)" />
            <img v-else :src="getImgUrl(item.path)" />
          </router-link>
          <div class="card-body d-flex justify-content-between">
            <div class="d-flex flex-column">
              <p>{{ item.name }}</p>
              <p>{{ item.view }}</p>
              <p>{{ item.User.username }}</p>
            </div>
            <div v-if="authenticate" class="d-flex flex-column">
              <button
                class="btn btn-outline-info"
                style="height: fit-content"
                v-on:click="addWatchLater(item.id)"
              >
                Watch Later
              </button>
              <div class="dropdown">
                <button
                  class="btn btn-outline-dark dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Add To PlayList
                </button>
                <div
                  class="dropdown-menu"
                  v-if="playListData.length > 0"
                  aria-labelledby="dropdownMenuButton"
                >
                  <a
                    class="dropdown-item"
                    v-for="play_list in playListData"
                    :key="play_list.id"
                    v-on:click="addPlayListCategory(play_list.id, item.id)"
                    >{{ play_list.name }}</a
                  >
                </div>
                <div
                  class="dropdown-menu"
                  v-else
                  aria-labelledby="dropdownMenuButton"
                >
                  <a class="dropdown-item m-0">No Playlist</a>
                </div>
              </div>
            </div>
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
  name: "explore",
  components: { sidebar, navbar },
  data() {
    return {
      video: [],
      authenticate: localStorage.getItem("user-token") || false,
      playListData: [],
      name: "",
    };
  },
  created() {
    this.getVideo();
  },
  watch: {
    video: {
      handler: function () {
        console.log("success");
      },
      deep: true,
    },
  },
  methods: {
    async getVideo() {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_BACKEND}/video/explore`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("user-token")}`,
            },
          }
        );
        this.video = response.data.data;
        if (this.authenticate) {
          const response1 = await axios.get(
            `${process.env.VUE_APP_BACKEND}/user`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("user-token")}`,
              },
            }
          );
          this.playListData = response1.data.data.playListCategory;
        }
      } catch (err) {
        console.log(err);
      }
    },
    getImgUrl(pic) {
      const image = pic.split("/");
      image.splice(6, 0, "w_200,h_200,c_scale");
      return image.join("/").slice(0, -4) + ".jpg";
    },
    async addWatchLater(id) {
      try {
        await axios.post(
          `${process.env.VUE_APP_BACKEND}/watchLater/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("user-token")}`,
            },
          }
        );
        this.$vToastify.success("Added to Watch Later");
      } catch (err) {
        console.log(err);
      }
    },
    async addPlayListCategory(category_id, video_id) {
      try {
        await axios.post(
          `${process.env.VUE_APP_BACKEND}/playlist/${video_id}`,
          { category_id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("user-token")}`,
            },
          }
        );
        this.$vToastify.success("Added to Playlist");
      } catch (err) {
        console.log(err);
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
      document.getElementById("overlay").style.display = "none";
      document.getElementById("overlay1").style.display = "none";
      document.getElementById("overlay2").style.display = "none";
    },
  },
};
</script>
