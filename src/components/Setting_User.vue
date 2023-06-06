<template>
  <!-- <div class="FirstSetting_User">     -->
  <div class="Setting_User">    
    <header>
      <div class="header_content">
        <!-- <router-link :to="{ name: 'HomePage'}" class="header_btn"> -->
        <div class="header_btn_Arrow">
          <a href="#" onClick="history.back(); return false;" class="btn-circle-border-simple"></a>
        </div>
        <!-- </router-link> -->
        <h1>ユーザー設定</h1>
        <!-- バーガーボタン -->
        <div class="hamburger-menu">
          <input type="checkbox" id="menu-btn-check" />
          <label for="menu-btn-check" class="menu-btn"><span></span></label>
          <div class="menu-content">
            <ul>
              <li>
                <router-link :to="{ name: 'Setting' }"> 時間割の設定 </router-link>
              </li>
              <li>
                <router-link :to="{ name: 'Setting_User' }"> ユーザー設定 </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>

    

    <!-- <div class="top_img"> -->
      <!-- <img src="../assets/top/logo1.png" width="405px" height="121px" /> -->
        <!-- MEETS -->
    <!-- </div> -->


    <main class="first_setting">
      <div>
        <h3>ニックネーム</h3>
        <input type="text" v-model="username">
      </div>

      <div>
        <h3>学部</h3>
        <select v-model="department">
          <option value="教育学部">教育学部</option>
          <option value="経済学部">経済学部</option>
          <option value="システム工学部">システム工学部</option>
          <option value="観光学部">観光学部</option>
        </select>
      </div>

      <div>
        <h3>学年</h3>
        <select v-model="grade">
          <option value=1>1</option>
          <option value=2>2</option>
          <option value=3>3</option>
          <option value=4>4</option>
        </select>
      </div>

      <div>
        <h3> アイコン設定</h3>
        <div  class="Setting_User_icon">

          <input type="radio" v-model="user_icon" id="blue_men" name="SelectIcon" value="blue_men">
          <label for="blue_men">
              <img src = "../assets/icon/blue_men.png" width="75px"/>
            </label>
            <input type="radio" v-model="user_icon" id="blue_women" name="SelectIcon" value="blue_women">
            <label for="blue_women">
              <img src = "../assets/icon/blue_women.png" width="75px"/>
            </label>
            <input type="radio" v-model="user_icon" id="green_men" name="SelectIcon" value="green_men">
            <label for="green_men">
              <img src = "../assets/icon/green_men.png" width="75px"/>
            </label>
            <input type="radio" v-model="user_icon" id="green_women" name="SelectIcon" value="green_women">
            <label for="green_women">
              <img src = "../assets/icon/green_women.png" width="75px"/>
            </label>
            <br>
            <input type="radio" v-model="user_icon" id="red_men" name="SelectIcon" value="red_men">
            <label for="red_men">
              <img src = "../assets/icon/red_men.png" width="75px"/>
            </label>
            <input type="radio" v-model="user_icon" id="red_women" name="SelectIcon" value="red_women">
            <label for="red_women">
              <img src = "../assets/icon/red_women.png" width="75px"/>
            </label>
            <input type="radio" v-model="user_icon" id="yellow_men" name="SelectIcon" value="yellow_men">
            <label for="yellow_men">
              <img src = "../assets/icon/yellow_men.png" width="75px"/>
            </label>
            <input type="radio" v-model="user_icon" id="yellow_women" name="SelectIcon" value="yellow_women">
            <label for="yellow_women">
              <img src = "../assets/icon/yellow_women.png" width="75px"/>
            </label>
        </div>
      </div>

      <div>
        <h3>一言コメント</h3>
				<textarea v-model="self_introduction"> </textarea>
      </div>

			<button @click="Decision">登録</button>
    </main>

  </div>
</template>


<script>
  import firebase from 'firebase'

  export default {
    data() {
      return {
				uid: this.$store.state.uid,
				username: "",
				department: "",
				grade: "",
        user_icon:"",
				self_introduction: ""
      };
    },

    created(){
      this.getName();
    },

    methods: {
      getName() {
      firebase
        .firestore()
        .collection("profile")
        .doc(this.uid)
        .get()
        .then((doc) => {
          this.username = doc.data().username;
          this.department = doc.data().department;
          this.grade = doc.data().grade;
          this.icon = doc.data().icon;
          this.self_introduction = doc.data().self_introduction;

          // 0810 追加 アイコン指定
          var theicon = document.getElementById(this.icon)
          theicon.checked = true;
          this.user_icon = this.icon
        });
    },



			Decision() {
        if((this.username === "")||(this.department === "")||(this.grade === "")||(this.user_icon === "")||(this.self_introduction === "")){
          alert("入力されていない項目があります")
          return          
        }
				firebase.firestore().collection("profile").doc(this.uid).update({
					username: this.username,
					department: this.department,
					grade: this.grade,
					icon: this.user_icon,
					self_introduction: this.self_introduction,
				},
        { marge: true })
				this.$router.push({ name: 'HomePage'})
			}
    }

  };
</script>


<style scoped>
  @import "css/header_style.css";
  @import "css/FirstSetting_Users.css";
  .Setting_User main{
    margin-top: 90px;
  }
</style>