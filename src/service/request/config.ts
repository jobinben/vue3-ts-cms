let BASE_URL: string
const TIME_OUT = 10000

// 此次采用了策略模式
const settings: any = {
  development: () => (BASE_URL = 'http://123.207.32.32:8000/'),
  production: () => (BASE_URL = 'http://jobing.top/pro'),
  test: () => (BASE_URL = 'http://jobing.top/test')
}

// 根据process.env.NODE_ENV区分环境
settings[process.env.NODE_ENV]()

export { BASE_URL, TIME_OUT }
