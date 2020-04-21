// import axios from 'axios'
import { getToken, setToken, removeToken } from '@/utils/auth.ts'

export const state = () => ({
  token: getToken(),
  name: '',
  avatar: '',
  des: ''
})

export const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_DES: (state, des) => {
    state.des = des
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_NAME: (state, name) => {
    state.name = name
  }
}

export const actions = {
  register({ commit }, userInfo) {
    const { name, password } = userInfo
    console.log('reg userInfo:', userInfo)
    return new Promise((resolve, reject) => {
      this.$axios
        .$post('/auth/register/user', { name, password })
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  login({ commit }, userInfo) {
    const { name, password } = userInfo
    return new Promise((resolve, reject) => {
      this.$axios
        .$post('/auth/login', { name, password })
        .then((e) => {
          console.log('user store login res:', e)
          commit('SET_TOKEN', e.token)
          setToken(e.token)
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  getUserInfo({ commit, state }) {
    const token = state.token
    // Adds header: `Authorization: Bearer 123` to all requests
    this.$axios.setToken(token, 'Bearer')
    return new Promise((resolve, reject) => {
      this.$axios
        .$post('/auth/userInfo')
        .then((e) => {
          commit('SET_NAME', e.name)
          // commit('SET_AVATAR',res.avatar)
          // commit('SET_DES',res.des)
          resolve(e)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  logout({ commit, state }) {
    // DES 严格意义上的退出还应该给后台发送请求，让其处理该用户的 token
    return new Promise((resolve, reject) => {
      this.$axios.setToken(false)
      commit('SET_TOKEN', '')
      commit('SET_NAME', '')
      removeToken()
      resolve(true)
    })
  }
}

// export default {
//   namespaced: true,
//   state,
//   mutations,
//   actions
// }