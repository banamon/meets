<template>
  <div class="signin">
    <h2>ログイン画面</h2>
    <!-- <input type="text" placeholder="メールアドレス" v-model="username"> -->
    <input type="text" placeholder="メールアドレス" v-model="mail">
	<br>
    <input type="password" placeholder="パスワード" v-model="password">
	<br>
    <button @click="signIn">Signin</button>
	<br>
 
    <p>
      <router-link to="/signup">新規登録はこちら</router-link>
    </p>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Signin',
  data() {
    return {
      // username: '',
      mail: '',
      password: '',
      uid: ''
    }
  },
  methods: {
    signIn: function () {
      // firebase.auth().signInWithEmailAndPassword(this.username, this.password)
      firebase.auth().signInWithEmailAndPassword(this.mail, this.password)
        .then(
          user => {
          const currentUser = firebase.auth().currentUser;
          this.uid = currentUser.uid;
          firebase
            .firestore()
            .collection("users")
            .doc(currentUser.uid)
            .get()
            
            
            console.log(user)
          // alert(this.uid + user + 'MEETS')
          this.$store.commit('getuid',this.uid)
          this.$router.push({name: 'HomePage', params: {uid: this.uid}})
        },
        err => {
          // alert(err.message)
          console.log(err)
          alert("メールアドレスかパスワードが間違っています")
        }
      )
    },
  
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
.signin {
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
