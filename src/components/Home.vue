<template>
  <div class="home">
    <header>
      <div class="header_content">
        <div></div>
        <h1>MEETS</h1>
        <!-- バーガーボタン -->
        <div class="hamburger-menu">
          <input type="checkbox" id="menu-btn-check" />
          <label for="menu-btn-check" class="menu-btn"><span></span></label>
          <div class="menu-content">
            <ul>
              <li>
                <router-link :to="{ name: 'Setting' }"> 時間割設定 </router-link>
              </li>
              <li>
                <router-link :to="{ name: 'Setting_User' }"> ユーザー設定 </router-link>
              </li>
              <li>
                <a href="#" @click="signout">ログアウト</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>

    
    <main>
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
            <!-- <td>{{index}}</td> -->
            <td class="TimeTableindex">{{TimeTable_Index[index-1]}}</td>
            <!-- ↓↓0806追加 登録されていないコマにクラス追加-->
            <td v-for="(thesubject, index) in MyTimeTable[index - 1]" v-bind:key="index" :class="[thesubject.Name == '' ? 'No_Subject_Cell':'Exist_Subject_Cell']">
              <router-link :to="{ name: 'TalkRoom', params: {Subject: thesubject.SID}}" class="theSubjectCell">
                  {{ thesubject.Name }}
              </router-link>
            </td>
          </tr>   
        </table>
      </div>
    </main>

    <!-- <h1>Home.vue</h1> -->
    <!-- <h2>ここに時間割表示 </h2> -->
    <!-- ID:<span>{{ uid }}</span><br> -->
    <!-- IDinState:<span>{{ myUID }}</span><br> -->
    <!-- <div>月曜1限のState中身：{{ theSubjectName_from_State_Mon[0] }}</div> -->
    <!-- Stateの中身 -->
    <!-- <div>SID月{{ mySID_from_State_Mon }}</div> -->
    <!-- <div>SID火{{ mySID_from_State_Tue }}</div> -->
    <!-- <div>授業名月：{{ theSubjectName_from_State_Mon[0] }}</div> -->
    <!-- <div>授業名火：{{ theSubjectName_from_State_Tue }}</div> -->
    <!-- <div>全ての時間割取得：{{ AllSubject }}</div> -->
    <!-- <div>月曜2限のState中身：{{ theSubjectName_from_State_Mon[1] }}</div> -->
    <!-- <div>月曜全体のState中身 授業名：{{ theSubjectName_from_State_Mon }}</div> -->
    <!-- <div>月曜全体のState中身 SID：{{ this.$store.state.mySID_Mon }}</div> -->
    <!-- <div>map：{{ SubjectName_inState }}</div> -->

      
  </div>
</template>

<script>
  import firebase from 'firebase'
  // import { mapState } from "vuex"

  export default {

    // 変数宣言
    data() {
      return {
        uid: this.$store.state.uid,

        TimeTable_Index:["Ⅰ","Ⅱ","Ⅲ","Ⅳ","Ⅴ",],
        
        MyTimeTable: [[],[],[],[],[],],
        MyTimeTable_SID: [[],[],[],[],[],],
        SID:""
      }
    },
    
    computed: {
      myUID () {
        return this.$store.state.uid;
      },
      AllSubject () {
        return this.$store.state.allSubject;
      },
    },


    created() {
      // Subjectを全て取得
      this.setAllSubject();
      // 時間割表示
      this.getTimetable();
    },

    methods: {
      // Subjectをすべて取得してStateに保存
      setAllSubject(){
        firebase.firestore().collection("Subject")
            .get()
            .then((query) => {
              var allSubject = [];
              query.forEach((doc) => {
                var data = doc.data();
                allSubject.push({
                  SID: doc.id,
                  Name: data.SubjectName,
                  teacher: data.teacher,
                  date: data.date,
                  time: data.time
                });
              });              
              this.$store.commit('setAllSubject',allSubject)
        })
      },


      getTimetable() {
        // 自分のuidとドキュメント検索⇒StateのmySID_曜日に格納
        firebase.firestore().collection("profile").doc(this.uid)
        .get()
        .then((doc) => {
          var allSubject = this.$store.state.allSubject;


          this.MyTimeTable_SID[0] = doc.data().Mon.concat();
          this.MyTimeTable_SID[1] = doc.data().Tue.concat();
          this.MyTimeTable_SID[2] = doc.data().Wed.concat();
          this.MyTimeTable_SID[3] = doc.data().Thu.concat();
          this.MyTimeTable_SID[4] = doc.data().Fri.concat();

          for(let i = 0; i < 5; i++){//月⇒金
            // var theDate = date[i]
            for(let j = 0; j < 5; j++){//1⇒5
              let theSID = this.MyTimeTable_SID[i][j]
              if(theSID === ""){
                theSID = "none"
              }
              const result = allSubject.filter(theSubject => theSubject.SID == theSID)
              this.MyTimeTable[j].push({SID: result[0].SID, Name: result[0].Name})
            }
          }
          
        });
      },
      signout() {
        this.$store.commit("getuid", "");
        this.$router.push("/signin");
      },
    }
  }
</script>



<style scoped>
  @import url(css/header_style.css);
  @import url(css/TimeTable_style.css);
  @import "./css/Home_style.css";  
  </style>