<template>
  <div class="link1">
    <h1>MEETS(Link2.vue)</h1>
    投稿者名
    <div>
      <input type="text" v-model="name">
    </div>

    コメント
    <div>
      <textarea v-model="comment"></textarea>
    </div>
    <br>
    <button @click="submitPosts">投稿する</button>
    <router-link to="/Home" tag="button">Homeに戻る</router-link>
    <router-link to="/signin" tag="button">ログアウト</router-link>
    <br>
    <br>
    <h2>投稿一覧</h2>
    <div v-for="post in posts" :key="post.name">
      <hr>
      <p>投稿者名： {{post.fields.name.stringValue}}</p>
      <p>コメント： {{post.fields.comment.stringValue}}</p>
    </div>

  </div>
</template>

<script>
import firebase from "firebase";
import axios from "axios";
export default {
  data() {
    return {
      name: '',
      comment: '',
      posts: ''
    };
  },
  created() {
    this.getPosts();
  },
  methods: {
    submitPosts() {
      axios.post(
        "https://firestore.googleapis.com/v1/projects/meets-test2/databases/(default)/documents/posts2",
        {
          fields: {
            name: {
              stringValue: this.name
            },
            comment: {
              stringValue: this.comment
            }
          }
        }
      ).then(() => {
        this.name = '';
        this.comment = '';
        this.getPosts();
      });
    },
    getPosts() {
      axios.get(
        "https://firestore.googleapis.com/v1/projects/meets-test2/databases/(default)/documents/posts2"
      )
      .then(res => {

        this.posts = res.data.documents;
      });
    },

    signOut:function () {
      firebase.auth().signOut().then(() => {
        this.$router.push('/signin')
      })
    }

  }

};
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
