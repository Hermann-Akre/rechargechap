import { createStore } from 'vuex'

export default createStore({
  state: {
    isAuthenticated: false,
    token: '',
    user: {
      id: 0,
      username: '',
    }
  },
  getters: {
  },
  mutations: {
    initializeStore(state){
      if(localStorage.getItem('token')) {
        state.token = localStorage.getItem('token')
        state.isAuthenticated = true
        state.user.username = localStorage.getItem('username')
        state.user.id = localStorage.getItem('userId')
      } else {
        state.token = ''
        state.isAuthenticated = false
        state.user.username = ''
        state.user.id = 0
      }
    },
    setToken(state, token) {
      state.token = token
      state.isAuthenticated = true
    },
    removeToken(state) {
      state.token = ''
      state.isAuthenticated = false
    },
    setUser(state, user){
      state.user = user
    }
  },
  actions: {
  },
  modules: {
  }
})
