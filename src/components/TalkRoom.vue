<template>
  <div class="TalkRoom">

    <header>
      <div class="header_content">
        <router-link :to="{ name: 'HomePage'}" class="header_btn">
          <div class="header_btn_Arrow"></div>
        </router-link>
        <h1>{{ this.SubjectName }}</h1>
        <!-- バーガーボタン -->
        <div class="hamburger-menu">
          <input type="checkbox" id="menu-btn-check" />
          <label for="menu-btn-check" class="menu-btn"><span></span></label>
          <div class="menu-content">
            <ul>
              <li>
                <router-link :to="{ name: 'HomePage' }"> 時間割 </router-link>
              </li>
              <li>
                <router-link :to="{ name: 'Setting' }"> 時間割の設定 </router-link>
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
       <!-- 参加者表示 -->
       <button id="Show_participant_btn" @click="Show_participant">
         <label for="Show_participant_btn" class="profile-solid icon"></label>
       </button>
       <div id="Participant_Window" class="NoDisplay">
         <button id="Remove_participant_btn" @click="Remove_participant" class="NoDisplay">
          <label for="Remove_participant_btn" class="profile-solid icon"></label>
         </button>
         <h2 class="Participant_Window_title">参加者</h2>
         <!-- 0810追加 スクロール用にクラス付与 -->
         <ul class="Participant_Window_List">
           <li v-for="(others, otheruid) in otheruser" v-bind:key="otheruid">
             <router-link :to="{ name: 'UserPage', params: { OtherUser_id: others.otheruid } }">
               {{ others.otherusername }}
             </router-link>
           </li>
         </ul>
       </div>

       <!-- 投稿一覧 -->
       <div id="Allpost">  
         <div  v-for="(chat, index) in chats" v-bind:key="index" :class="JudgePost(chat.uid)" class="thepost">
           <div class="thepost_main">
             <div class="thepost_main_user">
               <!-- アイコン -->
               <div v-if="chat.otheruser_icon === 'red_men'">
                 <img src="../assets/icon/red_men.png"/>
               </div>
               <div v-else-if="chat.otheruser_icon === 'red_women'">
                 <img src="../assets/icon/red_women.png"/>
               </div>
               <div v-else-if="chat.otheruser_icon === 'yellow_men'">
                 <img src="../assets/icon/yellow_men.png"/>
               </div>
               <div v-else-if="chat.otheruser_icon === 'yellow_women'">
                 <img src="../assets/icon/yellow_women.png"/>
               </div>
               <div v-else-if="chat.otheruser_icon === 'blue_men'">
                 <img src="../assets/icon/blue_men.png"/>
               </div>
               <div v-else-if="chat.otheruser_icon === 'blue_women'">
                 <img src="../assets/icon/blue_women.png"/>
               </div>
               <div v-else-if="chat.otheruser_icon === 'green_men'">
                 <img src="../assets/icon/green_men.png"/>
               </div>
               <div v-else-if="chat.otheruser_icon === 'green_women'">
                 <img src="../assets/icon/green_women.png"/>
               </div>
               <!-- <div v-else-if="chat.otheruser_icon === '匿名'"> -->
               <div v-else>
                 <img src="../assets/icon/icon0.png">
               </div>
               <!-- ユーザー名 -->
               <p>{{ chat.username }}</p>
             </div>
             <div class="thepost_text">
               <!-- スタンプ -->
               <!-- ↓↓0809追加 スタンプの時にclass thepost_stamp追加-->
               <div v-if="chat.comment.match(/stamp_/)" class="thepost_stamp thepost_comment">
                 <img v-if="chat.comment === 'stamp_asease.png'" src = "../assets/stamp/stamp_asease.png" width="75px"/>
                 <img v-else-if="chat.comment === 'stamp_bikkuri.png'" src = "../assets/stamp/stamp_bikkuri.png" width="75px"/>
                 <img v-else-if="chat.comment === 'stamp_hanya.png'" src = "../assets/stamp/stamp_hanya.png" width="75px"/>
                 <img v-else-if="chat.comment === 'stamp_heart.png'" src = "../assets/stamp/stamp_heart.png" width="75px"/>
                 <img v-else-if="chat.comment === 'stamp_hirameki.png'" src = "../assets/stamp/stamp_hirameki.png" width="75px"/>
                 <img v-else-if="chat.comment === 'stamp_iine.png'" src = "../assets/stamp/stamp_iine.png" width="75px"/>
               </div>
               
               <!-- コメント -->
               <div v-else class="thepost_comment">
                 <p>{{ chat.comment }}</p>
               </div>
               <!-- 日時 -->
               <p class="thepost_time">{{ chat.day }}</p>
             </div>
           </div>
         </div>
         <!-- 最後の行合わせ -->
         <div class="lastdiv"></div>
       </div>
   
      <!-- 入力フォーム -->
      <form id="from">
        <div id="form_input">
          <!-- 匿名 -->
          <div class="Form_Anonymous_Select model-7">

            <!-- 0810追加 匿名ボタンの変更 -->
            <div class="checkbox" >
              <input type="checkbox" class="NoDisplay" id="Anonymous_Select" v-model="value" true-value="Anonymous" false-value="Realname" @change="ChangeAnonymous(value)"/>
              <label for="Anonymous_Select" class="Anonymous_Select_label">匿名</label>
            </div>

            <!-- <label for="Anonymous_Select" class="Anonymous_Select_label">匿名</label>
            <div class="checkbox" >
              <input type="checkbox" id="Anonymous_Select" v-model="value" true-value="Anonymous" false-value="Realname" @change="ChangeAnonymous(value)"/>
              <label></label>
            </div> -->
              
          </div>
          <div id="Form_SubmitStamp">
              <button type="button" id="Show_StampSelect_btn" @click="Show_StampSelect">♡</button>
            <!-- </div> -->
            <button type="button" id="Remove_StampSelect_btn" @click="Remove_StampSelect" class="NoDisplay">✖</button>
            
            <!-- スタンプ選択画面 -->
            <div id="SelectWindow_Stamp" class="NoDisplay">
              <!-- 0810追加 スタンプのradioボタンにid追加 -->
              <label>
                <input type="radio" v-model="theStampDate" name="SelectStamp" value="stamp_asease.png" id="stamp_asease.png">
                <img src = "../assets/stamp/stamp_asease.png" width="75px"/>
              </label>
              <label>
                <input type="radio" v-model="theStampDate"  name="SelectStamp" value="stamp_bikkuri.png" id="stamp_bikkuri.png">
                <img src = "../assets/stamp/stamp_bikkuri.png" width="75px"/>
              </label>
              <label>
                <input type="radio" v-model="theStampDate"  name="SelectStamp" value="stamp_hanya.png" id="stamp_hanya.png">
                <img src = "../assets/stamp/stamp_hanya.png" width="75px"/>
              </label>
              <!-- <br> -->
              <label>
                <input type="radio" v-model="theStampDate"  name="SelectStamp" value="stamp_heart.png" id="stamp_heart.png">
                <img src = "../assets/stamp/stamp_heart.png" width="75px"/>
              </label>
              <label>
                <input type="radio" v-model="theStampDate"  name="SelectStamp" value="stamp_hirameki.png" id="stamp_hirameki.png">
                <img src = "../assets/stamp/stamp_hirameki.png" width="75px"/>
              </label>
              <label >
                <input type="radio" v-model="theStampDate"  name="SelectStamp" value="stamp_iine.png" id="stamp_iine.png">
                <img src = "../assets/stamp/stamp_iine.png" width="75px"/>
              </label>
            </div>
          </div>
          <div id="From_comennt">
           <textarea id="textarea" v-model="comment" placeholder="メッセージを入力してください"></textarea>
          </div>    
        </div>
        <!-- <button type="button" id="From_SubmitBtn" @click="submitPosts">送信</button> -->
        <button type="button" class="navigate-solid icon" id="From_SubmitBtn" @click="submitPosts">
          <img src="../assets/btn/Submit_Btn.png" alt="送信ボタン" id="SubmitBtn_img">
        </button>

     </form>
    </main>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      uid: this.$store.state.uid,

      chats: [],
      username: '',
      value: '',
      theStampDate: "",
      comment: '',
      posts: '',
      SID: '',
      SubjectName: "",

      remove_stamp:"",

      day: "",
      myturn: 0, //自分が送信側のとき1にする

      date: "",
      time: "",
      othersid: "", 
      otherusername: "",
      otheruser: [],
      OtherUser_id: "", //ユーザー画面へ送る相手のid
      otheruser_icon: "", //他ユーザーの色
      myicon: "", //自分の色

    };
  },
  created() {
    this.SID = this.$route.params.Subject;
    this.getSubject_Info();
    this.getName();
    this.getOtherUsers();
    this.getPosts();
    this.listenPosts();
  },

  beforeUpdate(){
    this.scroll_To_End();
  },

  methods: {

    scroll_To_End() {
      this.$nextTick(() => {
        window.scrollTo(0, document.body.clientHeight);
      });
    },

    // SIDから授業名を取得
    getSubject_Info(){
      firebase.firestore().collection("Subject").doc(this.SID)
          .get()
          .then((doc) => {
            this.SubjectName = doc.data().SubjectName
            this.date = doc.data().date;
            this.time = doc.data().time;
      });
    },

    // 名前の取得
    getName(){
      firebase.firestore().collection("profile").doc(this.uid)
          .get()
          .then((doc) => {
            this.username = doc.data().username;
            this.myicon= doc.data().icon;
          });
    },

    getOtherUsers() {
      var otheruser = [];
      var sid;
      firebase.firestore().collection("profile")
      .get()
      .then((query) => {
        query.forEach((doc) => {
          var getUid = doc.id;
          var thedate = this.date[0]
          var thetime = this.time[0]

            if(thedate == 'Mon'){
              sid = doc.data().Mon[thetime -1]
            }else if(thedate == 'Tue'){
              sid = doc.data().Tue[thetime -1]
            }else if(thedate == 'Wed'){
              sid = doc.data().Wed[thetime -1]
            }else if(thedate == 'Thu'){
              sid = doc.data().Thu[thetime -1]
            }else if(thedate == 'Fri'){
              sid = doc.data().Fri[thetime -1]
            }
            
            if (sid === this.SID) {
              if (getUid != this.uid) {
                otheruser.push({
                  otheruid: doc.id,
                  otherusername: doc.data().username,
                });
              }
            }
          });
          this.otheruser = otheruser;
        });
    },

    JudgePost(post_uid){
      // console.log(post_uid)
      if(post_uid == this.uid){
        return "my_post"
      }else{
        return "other_post"
      }
    },

    // 匿名切り替え
    ChangeAnonymous(value) {
      // console.log(value)
      if(value == "Anonymous"){
        this.username = "匿名";
      // }else if(value == "Realname"){
      }else{
        this.getName();
      }
    },

    // 未実装
    // ClickStamp(theStamp_name){
      // var TheStamp_btn = document.getElementById("TheStamp_" + theStamp_name);
      // TheStamp_btn.prop('checked', false); // チェックを外す
      // var radiobtn = document.getElementById("TheStamp_" + theStamp_name)
      // if(this.remove_stamp == theStamp_name) {
      //   radiobtn.checked = false;
      //   this.remove_stamp = "";
      // } else {
      //   this.remove_stamp = theStamp_name;
      // }
    // },

    // imgタグのsrcを変数で指定する
    // https://madogiwa0124.hatenablog.com/entry/2019/04/03/225511
    // loadImg(url){
    //   return require("../imgs/" + url);
    //   // return require(this.chats.comment);
    //   // return url;
    //   // return "../imgs/" + url;
    //   // return url;
    // },

    // 投稿
    submitPosts() {
      var message;
      if((this.comment === "")&&(this.theStampDate === "")){
        alert("文字を入力してください");
        return;
      }else if (this.comment === "") {
        message = this.theStampDate
      }else{
        message = this.comment
      }
      this.myturn = 1; //自分は送信側

      if (this.username === "匿名") {
        // this.mycolor = "匿名";
        this.myicon = "匿名";
      }
      this.Remove_StampSelect()

      firebase.firestore()
        .collection(this.SID)
        .add({
          uid: this.uid,
          username: this.username,
          comment: message,
          created: firebase.firestore.FieldValue.serverTimestamp(),
          icon: this.myicon
        })
        // 0810追加 送信後にformの初期化
        .then(()=>{
          this.ResetFrom()
        });
        // .catch((error) => {
          //   console.error("Error adding document: ", error);
          // })
          
    },
    
    // 0810追加 送信後にformの初期化
    ResetFrom(){
      console.log("ResetFrom")
      this.message = ''
      // textareaの初期化
      var textareaForm = document.getElementById("textarea");
      textareaForm.value = 'aaa';
      this.comment = ''
      // スタンプの初期化
      var theicon = document.getElementById(this.theStampDate)
      theicon.checked = false;
      this.theStampDate = '';
    },


    // 投稿の取得
    getPosts() {
      firebase
        .firestore()
        .collection(this.$route.params.Subject)
        .orderBy("created", "asc") // 最新のものから取得
        .get()
        .then((querySnapshot) => {
          // chatsに投稿内容を格納
          let chats = [];
          querySnapshot.forEach((doc) => {
            const date = new Date(doc.data().created * 1000);
            let timestampToTime = (date.getMonth()+1)+"/"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()
            chats.push({
              username: doc.data().username,
              uid: doc.data().uid,
              comment: doc.data().comment,
              day: timestampToTime,
              // otheruser_color: doc.data().color,
              otheruser_icon: doc.data().icon,
            });
          });
          this.chats = chats;
          // console.log(this.chats)
        })
        .catch((error) => {
          console.log(error);
        });
    },


    listenPosts() {
      const db = firebase.firestore();
      let flag = 0;
      // db.collection(this.subject)
      db.collection(this.SID)
      // db.collection(this.$route.params.Subject)
        .onSnapshot(snapshot => {
        for (let change of snapshot.docChanges()) {
          console.log(change.type);
          if (change.type === 'added') {
            if(this.myturn === 0){ //自分は受信側
              flag = 1;
            }
						//チャットの追加時(チャットが追加された場合に届く)
            //this.getnewPosts();
          }else if(change.type === 'modified'){
            if(this.myturn === 1){ //自分は送信側
              flag = 1;
            }
						//チャットの変更時(自分が送信した場合に届く)
          }
          /*else if(change.type === 'removed'){
						//チャットの削除時(この機能は実装しない)
          }
          */
        }

        if(flag == 1){ //addedeの時だけgetnewPosts呼び出し
          this.getPosts();
          flag = 0;
          this.myturn = 0;
        }

      });
      this.scroll_To_End();
    },

    // ログイン状態の確認
    JudgeLogin() {
      if (!this.uid) {
        alert('ログインが解除されました。再度ログインしてください')
        this.$router.push({ name: 'SigninPage' })
      }
    },

    signout() {
      this.$store.commit("getuid", "");
      this.$router.push("/signin");
    },

    Show_StampSelect(){
      // this.SelectWindow.classList.remove("NoDisplay")
      // this.Show_StampSelect_btn.classList.add("NoDisplay")
      // this.Remove_StampSelect_btn.classList.remove("NoDisplay")


      var SelectWindow = document.getElementById("SelectWindow_Stamp");
      SelectWindow.classList.remove("NoDisplay")
      var Show_StampSelect_btn = document.getElementById("Show_StampSelect_btn");
      Show_StampSelect_btn.classList.add("NoDisplay")
      var Remove_StampSelect_btn = document.getElementById("Remove_StampSelect_btn");
      Remove_StampSelect_btn.classList.remove("NoDisplay")
    },
    
    Remove_StampSelect(){
      var SelectWindow = document.getElementById("SelectWindow_Stamp");
      SelectWindow.classList.add("NoDisplay")
      var Show_StampSelect_btn = document.getElementById("Show_StampSelect_btn");
      Show_StampSelect_btn.classList.remove("NoDisplay")
      // var Remove_StampSelect_btn = document.getElementById("Remove_StampSelect_btn");
      // Remove_StampSelect_btn.classList.add("NoDisplay")
    },

    Show_participant(){
      var Participant_Window = document.getElementById("Participant_Window");
      Participant_Window.classList.remove("NoDisplay")
      var Show_participant_btn = document.getElementById("Show_participant_btn");
      Show_participant_btn.classList.add("NoDisplay")
      var Remove_participant_btn = document.getElementById("Remove_participant_btn");
      Remove_participant_btn.classList.remove("NoDisplay")
    },
    
    Remove_participant(){
      var Participant_Window = document.getElementById("Participant_Window");
      Participant_Window.classList.add("NoDisplay")
      var Show_participant_btn = document.getElementById("Show_participant_btn");
      Show_participant_btn.classList.remove("NoDisplay")
      var Remove_participant_btn = document.getElementById("Remove_participant_btn");
      Remove_participant_btn.classList.add("NoDisplay")
    },

    // Judge_submitbtn(){
    //   if((this.comment === "")||(this.theStampDate === "")){

    //   }
    // }
  }
};
</script>

<style scoped>
@import "./css/header_style.css";
@import "./css/TalkRoom_style.css";
</style>
