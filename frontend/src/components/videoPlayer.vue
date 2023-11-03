<template>
  <div>
    <navbar></navbar>
    <div v-if="video.length != 0" class="container play" style="margin-top: 8%">
      <div class="row">
        <div class="play_video">
          <video :src="getVideoUrl(video)" controls autoplay></video>
          <h3>{{ video.name }}</h3>
          <div class="play_info">
            <p>Views : {{ video.view }}</p>
            <div class="d-flex w-25" v-if="authenticate">
              <button class="btn"><img class="w-100" src="../assets/photo/white_mode/like_icon.png" alt="like" v-on:click="likeVideo()" /></button>
              <p class="d-flex align-items-center p-0 m-0">{{ video.likeVideo }}</p>
              <button class="btn p-0"><img class="w-50 mt-2" src="../assets/photo/white_mode/dislike_icon.png" alt="dislike" v-on:click="dislikeVideo()"/></button>
              <p class="d-flex align-items-center p-0 m-0">{{ video.dislikeVideo }}</p>
              <!-- <a href="#"><img src="../assets/photo/white_mode/share_icon.png" alt="share" />Share</a> -->
              <button class="btn"  id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img class="w-100" src="../assets/photo/white_mode/list_plus_icon_175099.png" alt="save" />
                <div class="dropdown-menu" v-if="playListData.length > 0" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item m-0"  v-for="play_list in playListData" :key="play_list.id" v-on:click="addPlayListCategory(play_list.id)">{{ play_list.name }}</a>
                </div>
                <div class="dropdown-menu" v-else aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item m-0" >No Playlist</a>
                </div>
              </button>
            </div>
          </div>
          <hr />

          <div class="publisher">
            <!-- profile user -->
            <div>
              <p>{{ video.User.username }}</p>
            </div>
          </div>
          <div class="description">
            <p>{{ video.description }}</p>
            <hr />
            <h4>Comments : {{ video.comment.length }}</h4>
            <form v-if="authenticate" method="post" @submit.prevent="comment" class="add_comment">
              <!-- gambar user -->
              <input type="text" v-model="description" placeholder="Comments..." />
            </form>

            <div class="other_comment" v-for="(items,index) in video.comment" :key="items.id">
              <!-- gambar user lain -->
              <div>
                <h3>{{ items.User.username}}<span>{{ getDate(items.createdAt) }}</span></h3>
                <p>{{ items.description }}</p>
                <div v-if="authenticate" class="comment_action">
                  <button class="btn p-0"><img style="width:21.5px" src="../assets/photo/white_mode/like_icon.png" alt="dislike" v-on:click="likeComment(items.id)"/></button>
                  <p class="d-flex align-items-center p-0 m-0">{{ items.likeComment }}</p>
                  <button class="btn p-0"><img class="ms-2 mt-2" src="../assets/photo/white_mode/dislike_icon.png" alt="dislike" v-on:click="dislikeComment(items.id)"/></button>
                  <p class="d-flex align-items-center p-0 m-0">{{ items.dislikeComment }}</p>
                  <button class="btn p-0" title="All Replies" v-b-modal.showModal><img class="w-50 ms-2 mt-2" src="../assets/photo/white_mode/reply.png" alt="reply" v-on:click="getReply(items.id)"/></button>
                  <form v-if="authenticate" method="post" @submit.prevent="replyComment(items.id,index)" class="add_comment my-0">
                    <input type="text" v-model="reply[index]" placeholder="Reply..." class="pt-0"/>
                  </form>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right_sidebar">
          <a href="#" class="side_thumbnail">
            <div class="side_list"></div>
          </a>
        </div>
      </div>
    </div>
    <b-modal id="showModal" v-bind:title="commentData" :hide-header-close="true">
      <div v-if="replyData.length == 0">
        <p>---</p>
      </div>
      <div v-else>
        <div class="other_comment flex-column align-items-start" v-for="(items,index) in replyData" :key="items.id">
            <h3>{{ items.User.username}}<span>{{ getDate(items.createdAt) }}</span></h3>
            <p>{{ items.description }}</p>
            <div v-if="authenticate" class="comment_action">
              <button class="btn p-0"><img style="width:21.5px" src="../assets/photo/white_mode/like_icon.png" alt="dislike" v-on:click="likeComment(items.id)"/></button>
              <p class="d-flex align-items-center p-0 m-0">{{ items.likeComment }}</p>
              <button class="btn p-0"><img class="ms-2 mt-2" src="../assets/photo/white_mode/dislike_icon.png" alt="dislike" v-on:click="dislikeComment(items.id)"/></button>
              <p class="d-flex align-items-center p-0 m-0">{{ items.dislikeComment }}</p>
              <button class="btn p-0" title="All Replies" v-b-modal.showModal><img class="w-50 ms-2 mt-2" src="../assets/photo/white_mode/reply.png" alt="reply" v-on:click="getReply(items.id)"/></button>
              <form v-if="authenticate" method="post" @submit.prevent="replyComment(items.id,index)" class="add_comment my-0">
                <input type="text" v-model="reply1[index]" placeholder="Reply..." class="pt-0"/>
              </form>
            </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment"
import navbar from "./navbar.vue";

export default {
  name: "video_player",
  components: { navbar },
  data() {
    return {
      video: [],
      id: this.$route.params.id,
      playListData: [],
      description : "",
      reply: [],
      reply1: [],
      authenticate : localStorage.getItem('user-token') || null,
      replyData : [],
      commentData : ""
    };
  },
  created: function() {
    this.getVideo();
  },
  watch:{
    video: {
      handler : function () {
        console.log('success')
      },
      deep: true
    }
  },
  methods: {
    getDate(date){
      return moment(date).format('MMMM Do YYYY, h:mm:ss a')
    },
    async getVideo() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_BACKEND}/video/${this.id}`);
        console.log(response)
        this.video = response.data.data;
        if(localStorage.getItem('user-token')){
          await axios.post(`${process.env.VUE_APP_BACKEND}/history/${this.id}`,{}, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("user-token")}`,
            },
          });
          const response1 = await axios.get(`${process.env.VUE_APP_BACKEND}/user`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("user-token")}`,
            },
          });
          this.playListData = response1.data.data.playListCategory
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getReply(comment_id) {
      try {
        const response = await axios.get(`${process.env.VUE_APP_BACKEND}/comment/${comment_id}`);
        if(response.data.data.Response){
          this.commentData = 'Comment : ' + response.data.data.Comment.description
          this.replyData = response.data.data.Response
        } else {
          this.commentData = 'No Replies'
          this.replyData = []
        }
      } catch (err) {
        console.log(err);
      }
    },
    getVideoUrl(vid){
      const video = vid.path.split("/");
      video.splice(6, 0, 'c_scale,c_pad,h_200,w_400');
      return video.join("/");
    },
    async addPlayListCategory(category_id){
       try {
        await axios.post(
          `${process.env.VUE_APP_BACKEND}/playlist/${this.id}`,
          { category_id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("user-token")}`,
            },
          }
        );
        
      } catch (err) {
        console.log(err);
      }
    },
    async likeVideo(){
      try {
        await axios.put(
          `${process.env.VUE_APP_BACKEND}/video/like/${this.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("user-token")}`,
            },
          }
        );
        this.getVideo()
      } catch (err) {
        console.log(err);
      }
    },
    async dislikeVideo(){
       try {
        await axios.put(
          `${process.env.VUE_APP_BACKEND}/video/dislike/${this.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("user-token")}`,
            },
          }
        );
        this.getVideo()
      } catch (err) {
        console.log(err);
      }
    },
    async likeComment(comment_id){
      try {
        await axios.put(
          `${process.env.VUE_APP_BACKEND}/comment/like/${this.id}`,
          { comment_id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("user-token")}`,
            },
          }
        );
        this.getVideo()
      } catch (err) {
        console.log(err);
      }
    },
    async dislikeComment(comment_id){
       try {
        await axios.put(
          `${process.env.VUE_APP_BACKEND}/comment/dislike/${this.id}`,
          { comment_id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("user-token")}`,
            },
          }
        );
        this.getVideo()
      } catch (err) {
        console.log(err);
      }
    },
    async replyComment(comment_id,index){
      const description = this.reply[index] || this.reply1[index]
       try {
         await axios.post(
           `${process.env.VUE_APP_BACKEND}/comment/reply/${this.id}`,
          { comment_id, description },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("user-token")}`,
            },
          }
        );
        this.reply.pop()
        this.reply1.pop()
        this.getVideo()
      } catch (err) {
        this.reply.pop()
        console.log(err);
      }
    },
    async comment() {
      try {
        await axios.post(
          `${process.env.VUE_APP_BACKEND}/comment/${this.id}`,
          { description: this.description },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("user-token")}`,
            },
          }
        );
        this.description = ""
        this.getVideo()
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
