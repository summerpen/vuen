import HelloWorld from './HelloWorld'
import PersagyTopol from './PersagyTopol'

// 将引入的组件模块存储，方便循环注册所有组件
const components = { HelloWorld, PersagyTopol }

const install = (Vue, options) => {
    if (install.installed) return
    install.installed = true
    console.log(options)
    for (const key in components) {
        if (components.hasOwnProperty(key)) {
            const component = components[key]
            Vue.component(component.name, component)
        }
    }
}

// 如果是直接引入的
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    // 使用Vue.use必须具有install方法
    // https://cn.vuejs.org/v2/api/#Vue-use
    install,
    // 同时导出组件列表
    ...components,
}
