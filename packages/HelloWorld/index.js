import HelloWorld from './src/index.vue'
HelloWorld.install = (Vue) => {
    Vue.components(HelloWorld.name, HelloWorld)
}
export default HelloWorld
