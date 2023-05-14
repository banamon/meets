"use strict"
// https://qiita.com/nmgw1119/items/27ed23e433ec54a9c950

import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uid: "",
    // 全ての時間割を格納
    allSubject:[]
  },

  getters: {
    // 第1引数に state をもつ
    // doneTodoCount: (state) => {
    //   return state.todos.filter(todo => todo.done).length
    // }
  },

  //stateを唯一変更できるもの
  // https://blog.codecamp.jp/vuejp-vuex-commentary
  mutations: {
    getuid (state, UID) {
        state.uid = UID
    },
    setAllSubject(state,Subjects){
      state.allSubject = Subjects
    },
  },

  plugins: [
    createPersistedState({
        storage: window.sessionStorage,
    })
  ] 
  // この行でvuexに「vuex-persistedstate」を追加
})