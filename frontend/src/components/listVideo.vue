<template>
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
</template>

<script>
import axios from "axios";

export default {
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
          `${process.env.VUE_APP_BACKEND}/video`,
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
    async search() {
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_BACKEND}/video/search`,
          { name: this.name }
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
  },
};
</script>
