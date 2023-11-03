import Vue from "vue";
import VueRouter from "vue-router";

import App from "./App.vue";
import Index from "./components/main_no_sign_in.vue";
import IndexUser from "./components/main_sign_in.vue";
import Explore from "./components/explore.vue";
import Library from "./components/library.vue";
import History from "./components/history.vue";
import Your_video from "./components/your_video.vue";
import Watch_later from "./components/watch_later.vue";
import playlist from "./components/playlist.vue";
import addPlaylist from "./components/addPlaylist.vue";
import videoPlayer from "./components/videoPlayer.vue";
import createAccount from "./components/create_accout.vue"
import Upload from "./components/upload.vue"
import VueToastify from "vue-toastify";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(VueRouter);
Vue.use(VueToastify, {
  position: "top-left",
  errorDuration: 1000,
  successDuration: 1000,
  warningInfoDuration: 1000
});

Vue.config.productionTip = false;

const ifAuthenticated = (to, from, next) => {
  if (localStorage.getItem("user-token")) {
    next();
    return;
  }
  router.push({
    name: "Index",
    params: {
      returnTo: to.path,
      query: to.query,
    },
  });
};

const routes = [
  {
    name: "Index",
    path: "/",
    component: Index,
  },
  {
    name: "videoPlayer",
    path: "/video/:id",
    component: videoPlayer
  },
  {
    name: "createAccount",
    path: "/signup",
    component: createAccount
  },
  {
    name: "IndexUser",
    path: "/home",
    component: IndexUser,
    beforeEnter: ifAuthenticated,
  },
  {
    name: "explore",
    path: "/explore",
    component: Explore,
    beforeEnter: ifAuthenticated,
  },
  {
    name: "library",
    path: "/library",
    component: Library,
    beforeEnter: ifAuthenticated,
  },
  {
    name: "history",
    path: "/history",
    component: History,
    beforeEnter: ifAuthenticated,
  },
  {
    name: "your_video",
    path: "/yourvideo",
    component: Your_video,
    beforeEnter: ifAuthenticated,
  },
  {
    name: "watch_later",
    path: "/watchlater",
    component: Watch_later,
    beforeEnter: ifAuthenticated,
  },
  {
    name: "playlist",
    path: "/playlist",
    component: playlist,
    beforeEnter: ifAuthenticated,
  },
  {
    name: "addPlaylist",
    path: "/addPlaylist",
    component: addPlaylist,
    beforeEnter: ifAuthenticated,
  },
  {
    name: "Upload",
    path: "/upload",
    component: Upload,
    beforeEnter: ifAuthenticated,
  }
];

const router = new VueRouter({ mode: "history", routes: routes });

new Vue({
  //init router
  router,
  render: (h) => h(App),
}).$mount("#app");
