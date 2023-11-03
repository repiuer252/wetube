<template>
  <div>
    <!-- <div id="overlay"> -->
    <!-- <div id="form_input_video">
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
      </div> -->
    <!-- </div> -->

    <!-- <nav class="flex">
      <div class="navbar_left flex">
        <img
          src="../assets/photo/dark_mode/menu_icon.png"
          alt="menu _icon"
          class="menu_icon"
        />
        <h3>WeTube</h3>
      </div>
      <div class="navbar_middle flex">
        <div class="search-box flex">
          <input type="text" placeholder="search" />
          <img
            src="../assets/photo/dark_mode/search_icon.png"
            alt="search_icon"
          />
        </div>
      </div>
      <div class="navbar_right flex">
        <div class="btn btn-outline-danger" v-on:click="signout()">
          <p class="m-0">Sign Out</p>
        </div>
      </div>
    </nav> -->
    <navbar></navbar>

    <sidebar></sidebar>
    <!-- <div class="sidebar">
            <div class="shortcut">
                <a href="/home">
                    <img src="../assets/photo/dark_mode/home_icon.png" alt="home">
                    <p>Home</p>
                </a>
                <router-link :to="{ name: ['explore'] }">
                    <img src="../assets/photo/white_mode/explore_icon.png" alt="Explore">
                    <p>Explore</p>
                </router-link>
                <router-link :to="{ name: ['subscription'] }">
                    <img src="../assets/photo/white_mode/subscription_icon.png" alt="Subscription">
                    <p>Subscription</p>
                </router-link>
                <hr>
                <router-link :to="{ name: ['library'] }">
                    <img src="../assets/photo/white_mode/library_icon.jpg" alt="library">
                    <p>Library</p>
                </router-link>
                <a href="#" v-on:click="on()">
                    <img src = "../assets/photo/white_mode/upload_icon.png" alt = "upload">Upload
                </a>
                <router-link :to="{ name: ['history'] }">
                    <img src="../assets/photo/dark_mode/history_icon.png" alt="history"
                    ><p>History</p>
                </router-link>
                <router-link :to="{ name: ['your_video'] }">
                    <img src="../assets/photo/white_mode/your_video_icon.png" alt="Your Video">
                    <p>Your Video</p>
                </router-link>
                <router-link :to="{ name: ['watch_later'] }">
                    <img src="../assets/photo/white_mode/time_icon.png" alt="Watch Later">
                    <p>Watch Later</p>
                </router-link>
                <router-link :to="{ name: ['playlist'] }">
                    <img src="../assets/photo/white_mode/showmore_icon.png" alt="playlist">
                    <p>Playlist</p>
                </router-link>            
                <hr>
            </div>

            <div class="subscriptions">
                <h6>Subscriptions</h6>
            </div>
        </div> -->

    <!-- ------tempat taruh video------- -->

    <div class="menuAdd">
      <div class="profile">
        <div class="logou" style="text-align: center">
          <h1
            style="
              font-size: 80px;
              font-weight: bold;
              background: -webkit-linear-gradient(red, yellow);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            "
          >
            WeTube
          </h1>
        </div>
        <div class="wrap">
          <h4 class="text-light text-center">Playlist Menu</h4>
          <div class="info">
            <p>Total Playlist</p>
            <router-link :to="{ name: ['addPlaylist'] }">
              <p class="text-primary">Add new playlist</p>
            </router-link>
          </div>
        </div>
        <hr
          style="
            width: 80%;
            background-color: yellow;
            height: 3px;
            margin: 0 auto;
          "
        />
        <div
          class="info2 d-flex flex-column"
          v-for="item in video"
          :key="item.id"
        >
          <div class="lists" v-on:click="listVideo(item)">
            <div class="icon">
              <div
                style="
                  width: 20px;
                  height: 3px;
                  background-color: white;
                  margin: 3px auto;
                "
              ></div>
              <div
                style="
                  width: 20px;
                  height: 3px;
                  background-color: white;
                  margin: 3px auto;
                "
              ></div>
            </div>
            <p class="text-center text-light mb-0">{{ item.name }}</p>
            <div>
              <img class="mx-auto w-100 h-100" :src="getImgUrl(item)" />
            </div>
            <div class="icon">
              <div
                style="
                  width: 20px;
                  height: 3px;
                  background-color: white;
                  margin: 3px auto;
                "
              ></div>
              <div
                style="
                  width: 20px;
                  height: 3px;
                  background-color: white;
                  margin: 3px auto;
                "
              ></div>
            </div>
          </div>
        </div>
        <div class="info2 d-flex flex-column">
          <div class="lists" v-on:click="listUploadedVideo(uploaded)">
            <div class="icon">
              <div
                style="
                  width: 20px;
                  height: 3px;
                  background-color: white;
                  margin: 3px auto;
                "
              ></div>
              <div
                style="
                  width: 20px;
                  height: 3px;
                  background-color: white;
                  margin: 3px auto;
                "
              ></div>
            </div>
            <p class="text-center text-light mb-0">Uploaded Video</p>
            <div>
              <img
                class="mx-auto w-100 h-100"
                :src="getUploadedImg(uploadedVideo)"
              />
            </div>
            <div class="icon">
              <div
                style="
                  width: 20px;
                  height: 3px;
                  background-color: white;
                  margin: 3px auto;
                "
              ></div>
              <div
                style="
                  width: 20px;
                  height: 3px;
                  background-color: white;
                  margin: 3px auto;
                "
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div class="lists lists-videos py-5 mt-5">
        <div
          class="videos"
          style="display: flex; align-items: center; margin-bottom: 5%"
          v-for="(item, index) in playlist"
          :key="item.id"
        >
          <h4 style="margin: 0 1.5%">{{ index + 1 }}</h4>
          <div class="video">
            <router-link
              v-if="item.Video"
              class="mx-auto my-2"
              :to="{ path: '/video/' + item.Video.id }"
              ><img class="mx-auto w-100 h-100" :src="getPlayListUrl(item)"
            /></router-link>
            <router-link
              v-else
              class="mx-auto my-2"
              :to="{ path: '/video/' + item.id }"
              ><img class="mx-auto w-100 h-100" :src="getPlayListUrl(item)"
            /></router-link>
          </div>
          <div
            v-if="item.Video"
            class="d-flex ms-2 flex-column align-items-center"
          >
            <p>{{ item.Video.name }}</p>
            <p>{{ item.Video.User.username }}</p>
            <small>{{ item.Video.description }}</small>
          </div>
          <div v-else class="d-flex ms-2 justify-content-between w-50">
            <div>
              <p>{{ item.name }}</p>
              <p>{{ item.User.username }}</p>
              <small>{{ item.description }}</small>
            </div>
            <button
              class="btn btn-danger"
              style="height: fit-content"
              v-on:click="deleteVideo(item.id)"
            >
              Remove
            </button>
          </div>
          <h5 style="margin: 0 1.5%"></h5>
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
  name: "playlist",
  components: { sidebar, navbar },
  data() {
    return {
      video: [],
      title: "",
      playlist: [],
      uploaded: [],
      uploadedVideo: [],
    };
  },
  beforeCreate() {},
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
          `${process.env.VUE_APP_BACKEND}/playlist`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("user-token")}`,
            },
          }
        );
        const response1 = await axios.get(
          `${process.env.VUE_APP_BACKEND}/video/uploaded`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("user-token")}`,
            },
          }
        );
        this.video = response.data.data;
        this.uploaded = response1.data.data;
        if (this.uploaded.length > 0) {
          this.uploadedVideo = this.uploaded[0];
        }
        if (this.video.length > 0) {
          this.playlist = this.video[0].playList;
        }
      } catch (err) {
        console.log(err);
      }
    },
    getImgUrl(pic) {
      if (pic.playList.length == 0) {
        return "https://picsum.photos/200/200?random=1";
      } else {
        if (!pic.playList[0].Video.thumbnail) {
          const image = pic.playList[0].Video.path.split("/");
          image.splice(6, 0, "w_200,h_200,c_scale");
          return image.join("/").slice(0, -4) + ".jpg";
        }
        const image = pic.playList[0].Video.thumbnail.split("/");
        image.splice(6, 0, "w_200,h_200,c_scale");
        return image.join("/").slice(0, -4) + ".jpg";
      }
    },
    getUploadedImg(pic) {
      if (pic.length == 0) {
        return "https://picsum.photos/200/200?random=1";
      } else {
        if (!pic.thumbnail) {
          const image = pic.path.split("/");
          image.splice(6, 0, "w_200,h_200,c_scale");
          return image.join("/").slice(0, -4) + ".jpg";
        }
        const image = pic.thumbnail.split("/");
        image.splice(6, 0, "w_200,h_200,c_scale");
        return image.join("/").slice(0, -4) + ".jpg";
      }
    },
    async deleteVideo(id) {
      try {
        await axios.delete(`${process.env.VUE_APP_BACKEND}/video/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user-token")}`,
          },
        });
        this.getVideo();
        this.$vToastify.success("Deleted Video");
      } catch (err) {
        console.log(err);
      }
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
    listVideo(item) {
      if (item.playList.length == 0) {
        this.playlist = [];
      } else {
        this.playlist = item.playList;
      }
    },
    listUploadedVideo(item) {
      if (item.length == 0) {
        this.playlist = [];
      } else {
        this.playlist = item;
      }
    },
    getPlayListUrl(item) {
      if (item.path) {
        if (!item.thumbnail) {
          const image = item.path.split("/");
          image.splice(6, 0, "w_200,h_200,c_scale");
          return image.join("/").slice(0, -4) + ".jpg";
        }
        const image = item.thumbnail.split("/");
        image.splice(6, 0, "w_200,h_200,c_scale");
        return image.join("/").slice(0, -4) + ".jpg";
      } else {
        if (!item.Video.thumbnail) {
          const image = item.Video.path.split("/");
          image.splice(6, 0, "w_200,h_200,c_scale");
          return image.join("/").slice(0, -4) + ".jpg";
        }
        const image = item.Video.thumbnail.split("/");
        image.splice(6, 0, "w_200,h_200,c_scale");
        return image.join("/").slice(0, -4) + ".jpg";
      }
    },
  },
};
</script>
