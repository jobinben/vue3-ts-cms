// 封装axios
import axios from 'axios'
import { ElLoading } from 'element-plus'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import type { ILoadingInstance } from 'element-plus'

interface JBRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

interface JBRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: JBRequestInterceptors<T>
  showLoading?: boolean
}

const DEFAULT_LOADING = true

class JBRequest {
  instance: AxiosInstance
  interceptors?: JBRequestInterceptors
  showLoading: boolean
  loading?: ILoadingInstance

  constructor(config: JBRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)

    // 添加loading
    this.showLoading = config.showLoading ?? DEFAULT_LOADING

    // 封装拦截器
    this.interceptors = config.interceptors
    // 1. 从config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 2. 添加所有实例全局默认的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('所有实例都有的拦截器: 请求成功拦截')
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求...',
            background: 'rgba(0, 0, 0, 0.3)'
          })
        }
        return config
      },
      (err) => {
        console.log('所有实例都有的拦截器: 请求失败拦截')
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        console.log('所有实例都有的拦截器: 响应成功拦截')
        // 响应时 将loading移除
        this.loading?.close()
        return res.data
      },
      (err) => {
        console.log('所有实例都有的拦截器: 响应失败拦截')
        this.loading?.close()
        return err
      }
    )
  }

  // 封装request
  request<T>(config: JBRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1. 单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // 2. 判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1. 单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // 2. 将showLoading设置为初始值，这样子不会影响下一个请求
          this.showLoading = DEFAULT_LOADING
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING
          reject(err)
        })
    })
  }

  // 封装get
  get<T>(config: JBRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  // 封装post
  post<T>(config: JBRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  // 封装put
  put<T>(config: JBRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT' })
  }

  // 封装delete
  delete<T>(config: JBRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  // 封装patch
  patch<T>(config: JBRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default JBRequest
