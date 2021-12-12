import { createStore, Store, useStore as useVuexStore } from 'vuex'
import login from './login/login'
import type { StoreType } from './type'

const store = createStore({
  state: {
    name: 'jobin'
  },
  mutations: {},
  actions: {},
  modules: {
    login
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export function useStore(): Store<StoreType> {
  return useVuexStore()
}

export default store
