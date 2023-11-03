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

    <div class="menuAdd flex-column bg-dark min-vh-100 mt-5">
      <div class="mx-auto mt-3 title">
        <p
          style="
            font-family: 'The Nautigal', cursive;
            font-weight: bold;
            background: linear-gradient(to right, #ee9ca7, #ffdde1);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          "
        >
          Your History
        </p>
      </div>
      <hr
        class="hrWatchLater mx-auto p-0"
        style="
          height: 2px;
          background: linear-gradient(to right, white, aqua);
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
  name: "history",
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
          `${process.env.VUE_APP_BACKEND}/history`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("user-token")}`,
            },
          }
        );
        this.video = response.data.data;
        console.log(this.video);
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
  },
};
</script>
