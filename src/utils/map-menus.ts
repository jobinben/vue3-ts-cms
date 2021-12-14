import { RouteRecordRaw } from 'vue-router'

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 1. 先去加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = []

  // 第二个参数设置为true时，可以循环递归目录所有的.ts文件 否则是当前目录下的.ts文件
  // 这里的require是webpack的一个函数 可以获取指定目录下文件导出的对象
  const routeFiles = require.context('../router/main', true, /\.ts/)

  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })

  // 2. 根据菜单获取需要添加的routes
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      // 只渲染二级菜单下的路由
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route) //添加路由
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(userMenus)

  return routes
}
