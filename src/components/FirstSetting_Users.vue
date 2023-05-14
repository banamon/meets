<template>
  <div class="FirstSetting_User">
    <header id="header">
      <!-- <div class="wrapper"> -->
      <!-- <h1>設定</h1> -->
      <h3>オンライン講義を受ける全ての学生のためのコミュニティー</h3>
      <!-- </div> -->
    </header>

    <div class="top_img">
      <!-- <img src="../assets/top/logo1.png" width="405px" height="121px" /> -->
        MEETS
    </div>


    <div class="first_setting">
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
      <!-- <div>
        <select v-model="color">
          <option value="赤">赤</option>
          <option value="青">青</option>
          <option value="黄">黄</option>
        </select>
      </div> -->
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
    </div>

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
				// color: "",
        user_icon:"",
				self_introduction: ""
      };
    },

    methods: {
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
				// firebase.firestore().collection("profile").doc(this.uid).set({
				// 	username: this.username,
				// 	department: this.department,
				// 	grade: this.grade,
				// 	color: this.color,
				// 	self_introduction: this.self_introduction,
        //   Mon: ["", "", "", "", ""],
        //   Tue: ["", "", "", "", ""],
        //   Wed: ["", "", "", "", ""],
        //   Thu: ["", "", "", "", ""],
        //   Fri: ["", "", "", "", ""],
				// })
				this.$router.push({ name: 'HomePage'})
			}
    }

  };
</script>


<style scoped>
  @import "css/header_style.css";
  @import "css/FirstSetting_Users.css";
</style>