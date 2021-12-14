import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BASE_URL } from './service/request/config'
import 'normalize.css'
import './assets/css/index.scss'
import { setupStore } from '@/store/index'
const app = createApp(App)
app.use(store)
// 初始化本地存储的Store
setupStore()
app.use(router)
app.mount('#app')
console.log('测试当前环境: ', BASE_URL)
console.log('通过.env文件形式配置的环境: ', process.env.VUE_APP_BASE_URL)

// interface IDataType {
//   data: any
//   returnCode: string
//   success: boolean
// }

// jbRequest
//   .request<IDataType>({
//     url: '/home/multidata',
//     method: 'GET',
//     headers: {},
//     interceptors: {
//       requestInterceptor: (config) => {
//         console.log('单独请求的拦截')
//         // config.headers['token'] = 'hastoken'
//         return config
//       },
//       responseInterceptor: (res) => {
//         console.log('单独响应的拦截')
//         return res
//       }
//     }
//   })
//   .then((res) => {
//     console.log(res)
//   })

// jbRequest
//   .get<IDataType>({
//     url: '/home/multidata',
//     showLoading: true
//   })
//   .then((res) => {
//     console.log(res.data)
//   })
