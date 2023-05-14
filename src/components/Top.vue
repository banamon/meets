<template>
  <div class="Top">
    <header id="header">
      <div class="wrapper">
        <h3>オンライン講義を受ける全ての学生のためのコミュニティー</h3>
      </div>
    </header>

    <div class = "top_img">
      <!-- <img src="../assets/logo/logo-MEETS.png"  width="405px" height="121px"/> -->
      <img src="../assets/logo/logo-MEETS.png"/>
    </div>

    <div class = "introduction">
      <h3>時間割表からトークルームへ</h3>
      <h3>すぐ繋がる  すぐ話せる</h3>
    </div>

    <div class = "signin_button">
      <router-link :to="{ name: 'SigninPage' }" tag="button" class = "button" id="btn-border">
        ログイン
      </router-link>
    </div>
    <div class="signup_button">
      <router-link :to="{ name: 'SignupPage' }" tag="button" class = "button">アカウント登録</router-link>
    </div>


  </div>
</template>

<script>
export default {
  name: 'Top'
}
</script>

<style scoped>
@import "./css/header_style.css";
@import "./css/Top_style.css";
/* h1 {
  font-weight: normal;
}

.mi-bou_icon{
  width: 300px;
  margin-bottom: 50px;
}

.Top {
  margin-top: 20px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center
} */
</style>
