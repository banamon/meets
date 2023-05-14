<template>
  <div class="signup">
    <h2>新規登録画面</h2>
    <input type="text" placeholder="メールアドレス" v-model="user_mail">
    <br>
    <input type="password" placeholder="パスワード" v-model="password">
    <br>
    <button @click="signUp">登録</button>
    <br>
    <p>
      <router-link to="/signin">ログイン</router-link>
    </p>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Signup',
  data () {
    return {
      user_mail: '',
      username: '',
      password: '',
      uid:''
    }
  },
  methods: {
    signUp: function () {
      //アカウントを作成する
      firebase.auth().createUserWithEmailAndPassword(this.user_mail, this.password)
        .then(user => {
          alert('Create account: ', user.email)

          const currentUser = firebase.auth().currentUser;
          // uidの取得
          this.uid = currentUser.uid;
          firebase
            .firestore()
            .collection("users")
            .doc(currentUser.uid)
            .get()  

            // 自分のDBの作成
            firebase.firestore().collection('profile').doc(this.uid).set({
              Mon: ['', '', '', '', ''],
              Tue: ['', '', '', '', ''],
              Wed: ['', '', '', '', ''],
              Thu: ['', '', '', '', ''],
              Fri: ['', '', '', '', ''],
            })


            // ログイン
            this.$store.commit('getuid',this.uid)
            this.$router.push('/FirstSetting_Users')

          })
          .catch(error => {
            alert(error.message)
          })

    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.signup {
  margin-top: 20px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center
}
input {
  margin: 10px 0;
  padding: 10px;
}
</style>
