import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store.js'
import firebase from 'firebase'
//import firebase from './firebase.js'

Vue.config.productionTip = false
Vue.config.devtools = true;


const config = {
  apiKey: "AIzaSyBZQ3xFwTphwV8BEpxZTe6yYPC67HIlFbY",
  authDomain: "meets-test2.firebaseapp.com",
  projectId: "meets-test2",
  storageBucket: "meets-test2.appspot.com",
  messagingSenderId: "847390953746",
  appId: "1:847390953746:web:4bf50b54d731bd9a4923cb"
};

firebase.initializeApp(config);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
}).$mount('#app')
