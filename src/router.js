import Vue from 'vue'
import Router from "vue-router"
import Link1 from "./components/Link1.vue"
import Link2 from "./components/Link2.vue"
import TalkRoom from "./components/TalkRoom.vue"
import Home from "./components/Home.vue"
import Setting from "./components/Setting.vue"
import Setting_User from "./components/Setting_User.vue"
import FirstSetting_Users from "./components/FirstSetting_Users.vue"
import UserPage from "./components/UserPage.vue"
import Top from "./components/Top.vue"
import Signin from "./components/Signin.vue"
import Signup from "./components/Signup.vue"

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      component: Top
    },
    {
      path: "/link1",
      component: Link1
    },
    {
      path: "/link2",
      component: Link2
    },
    {
      path: "/Home",
      // path: "Home/:uid",
      name: 'HomePage',
      component: Home,
      props: true
    },
    {
      path: "/UserPage/:OtherUser_id",
      name: 'UserPage',
      component: UserPage,
      props: true
    },
    {
      path: "/Setting",
      name: "Setting",
      component: Setting,
      props: true
    },
    {
      path: "/Setting_User",
      name: "Setting_User",
      component: Setting_User,
      props: true
    },
    {
      path: "/FirstSetting_Users",
      name: "FirstSetting_Users",
      component: FirstSetting_Users,
      props: true
    },
    {
      path: "/TalkRoom/:Subject",
      name: "TalkRoom",
      component: TalkRoom,
      props: true
    },
    {
      path: "/signin",
      name: "SigninPage",
      component: Signin
    },
    {
      path: "/signup",
      name: "SignupPage",
      component: Signup
    },
  ]
});
