import { Module } from 'vuex'
import LocalCache from '@/utils/cache'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login'
import type { IAccount } from '@/service/login/type'
import type { IRootState } from '../type'
import type { ILoginState } from './types'
import router from '@/router'
import { mapMenusToRoutes } from '@/utils/map-menus'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    }
  },

  getters: {},

  mutations: {
    changeToken(state: ILoginState, token: string) {
      state.token = token
    },
    changeUserInfo(state: ILoginState, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state: ILoginState, userMenus: any) {
      state.userMenus = userMenus
      // 注册动态路由
      // userMenus => routes
      const routes = mapMenusToRoutes(userMenus)
      // 注册
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
    }
  },

  actions: {
    async accountLoginAction({ commit }: any, payload: IAccount) {
      // 1. 实现登录逻辑
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      LocalCache.setCache('token', token)
      // 2. 请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      console.log(userInfoResult)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      LocalCache.setCache('userInfo', userInfo)
      // 3. 请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      LocalCache.setCache('userMenus', userMenus)

      // 4. 跳转到首页
      router.push('/main')
    },

    loadLocalLogin({ commit }) {
      const token = LocalCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = LocalCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = LocalCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginModule
