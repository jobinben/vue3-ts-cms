import { App } from 'vue'

// 导入统一样式
import 'element-plus/theme-chalk/base.css'
// 然后其他按需引入的样式通过动态配置引入
import { ElButton, ElInput, ElTable, ElTag } from 'element-plus'

const components = [ElButton, ElInput, ElTable, ElTag]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}