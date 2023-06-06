// import Vue from 'vue'
// import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import Signin from '@/components/Signin'
// import Signup from '@/components/Signup'
// import firebase from 'firebase'


// Vue.use(Router)

// const router = new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'HelloWorld',
//       component: HelloWorld
//     },


//     {
//       path: '/signin',
//       name: 'Signin',
//       component: Signin
//     },

//     {
//       path: '/signup',
//       name: 'Signup',
//       component: Signup
//     },


//   ]
// })

// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
//   if (requiresAuth) {
//     // このルートはログインされているかどうか認証が必要です。
//     // もしされていないならば、ログインページにリダイレクトします。
//     firebase.auth().onAuthStateChanged(function (user) {
//       if (user) {
//         next()
//       } else {
//         next({
//           path: '/signin',
//           query: { redirect: to.fullPath }
//         })
//       }
//     })
//   } else {
//     next() // next() を常に呼び出すようにしてください!
//   }
// })
// export default router
