<template>
  <!-- OtherTimeTable_SID -->
  <div class="User">
    <header>
      <div class="header_content">
        <!-- <router-link :to="{ name: 'HomePage'}" class="header_btn"> -->
        <div class="header_btn_Arrow">
          <a href="#" onClick="history.back(); return false;" class="btn-circle-border-simple"></a>
        </div>
        <!-- </router-link> -->
        <h1>プロフィール</h1>
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

    <div class = "profile">
      <div class="profile_icon">
        <div v-if="this.OtherUser_icon === 'red_men'">
          <img src="../assets/icon/red_men.png" width="75px"/>
        </div>
        <div v-else-if="this.OtherUser_icon === 'red_women'">
          <img src="../assets/icon/red_women.png" width="75px"/>
        </div>
        <div v-else-if="this.OtherUser_icon === 'yellow_men'">
          <img src="../assets/icon/yellow_men.png" width="75px"/>
        </div>
        <div v-else-if="this.OtherUser_icon === 'yellow_women'">
          <img src="../assets/icon/yellow_women.png" width="75px"/>
        </div>
        <div v-else-if="this.OtherUser_icon === 'blue_men'">
          <img src="../assets/icon/blue_men.png" width="75px"/>
        </div>
        <div v-else-if="this.OtherUser_icon === 'blue_women'">
          <img src="../assets/icon/blue_women.png" width="75px"/>
        </div>
        <div v-else-if="this.OtherUser_icon === 'green_men'">
          <img src="../assets/icon/green_men.png" width="75px"/>
        </div>
        <div v-else-if="this.OtherUser_icon === 'green_women'">
          <img src="../assets/icon/green_women.png" width="75px"/>
        </div>
      </div> 

      <div class="profile_user">
      <br>
      <a>{{ this.OtherUser_name }}</a>
      <br>
      <br>
      <!-- {{ this.OtherUser_id }} uid -->
      <a>{{ this.OtherUser_department }}</a>
      <a>{{ this.OtherUser_grade }}年生</a>
      <br />
      <!-- {{ this.OtherUser_color }} -->
      <br />
      <div class="OtherUser_self_introduction">
      <a>{{ this.OtherUser_self_introduction }}</a>
      </div>
      <br />

      </div>

    </div>

    <!-- 時間割表示 -->
    <div class="TimeTable">
      <table>
        <tr>
          <th></th>
          <th>Mon</th>
          <th>Tue</th>
          <th>Wed</th>
          <th>Thu</th>
          <th>Fri</th>
        </tr>
        
        <tr v-for="index in 5" v-bind:key="index">
          <td class="TimeTableindex">{{TimeTable_Index[index-1]}}</td>
          <td v-for="(thesubjectName, index) in OtherTimeTable_SubjectName[index-1]" v-bind:key="index" :class="[thesubjectName == '' ? 'No_Subject_Cell':'Exist_Subject_Cell']">
            {{thesubjectName}}
          </td>
        </tr>
      </table>

    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      OtherUser_id: this.$route.params.OtherUser_id,
      OtherUser_name:'',
      OtherUser_department:'',
      OtherUser_grade:'',
      // OtherUser_color:'',
      OtherUser_icon:'',
      OtherUser_self_introduction:'',
      TimeTable_Index:["Ⅰ","Ⅱ","Ⅲ","Ⅳ","Ⅴ",],

      OtherTimeTable_SID: [[],[],[],[],[],],
      OtherTimeTable_SubjectName: [[],[],[],[],[],],
      
    };
  },
  created(){
    //this.SID = this.$route.params.Subject;
    this.getOtherUsers();
    this.getTimetable();
  },
  methods: {
    getOtherUsers() {
      firebase.firestore().collection("profile").doc(this.OtherUser_id).get().then((doc) => {
        this.OtherUser_name = doc.data().username;
        this.OtherUser_department = doc.data().department;
        this.OtherUser_grade = doc.data().grade;
        // this.OtherUser_color = doc.data().color;
        this.OtherUser_icon = doc.data().icon;
        this.OtherUser_self_introduction = doc.data().self_introduction;
      })
    },

    getTimetable() {
        // 自分のuidとドキュメント検索⇒StateのmySID_曜日に格納
        firebase.firestore().collection("profile").doc(this.OtherUser_id)
        .get()
        .then((doc) => {

          var allSubject = this.$store.state.allSubject;
          // var theOtherTimeTable_SubjectName =  [[],[],[],[],[],]

          this.OtherTimeTable_SID[0] = doc.data().Mon.concat();
          this.OtherTimeTable_SID[1] = doc.data().Tue.concat();
          this.OtherTimeTable_SID[2] = doc.data().Wed.concat();
          this.OtherTimeTable_SID[3] = doc.data().Thu.concat();
          this.OtherTimeTable_SID[4] = doc.data().Fri.concat();
          
          
          
          for(let i = 0; i < 5; i++){//月⇒金
            // var theDate = date[i]
            for(let j = 0; j < 5; j++){//1⇒5
              let theSID = this.OtherTimeTable_SID[i][j]
              if(theSID === ""){
                theSID = "none"
              }
              const result = allSubject.filter(theSubject => theSubject.SID == theSID)
              // this.$set(this.OtherTimeTable_SubjectName,[i][j],result[0].Name)

              // this.OtherTimeTable_SubjectName[i][j] = result[0].Name
              // -------------------------------------------------------
              // theOtherTImetableに入れて後からThis.Othe...にいれたら反応するかも $set的な
              // theOtherTimeTable_SubjectName[i][j] = result[0].Name
              this.OtherTimeTable_SubjectName[j].push(result[0].Name)
            }
            console.log("this.OtherTimeTable_SubjectName" + i)
            console.log(this.OtherTimeTable_SubjectName)
          }

          console.log("this.OtherTimeTable_SubjectName")
          console.log(this.OtherTimeTable_SubjectName)
          
          // console.log(this.OtherTimeTable_SubjectName)
        });
        console.log(this.OtherTimeTable_SID)
        console.log(this.OtherTimeTable_SubjectName)
    },
  },
};
</script>


<style scoped>
  @import "./css/header_style.css";
  @import "./css/UserPage_style.css";
</style>
