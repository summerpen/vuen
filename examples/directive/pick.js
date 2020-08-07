// 本地存缓存
function setStorage(id, maxAge) {
    maxAge = new Date().getTime() + maxAge
    localStorage.setItem('news_' + id, maxAge)
}
//  判断是否过期
function isOverdue(id) {
    const preTime = localStorage.getItem('news_' + id)
    if (new Date().getTime() > +preTime) {
        localStorage.removeItem('news_' + id)
        return true
    } else {
        return false
    }
}
function pick(el, binding) {
    // 拿到新闻id
    const id = binding.value.id // 拿到对应的处理函数
    const handle = binding.value.handle // 是否传递了color参数，点击后文本的颜色，如果有用传递的，没有就用默认的#999
    const color = binding.arg ? '#' + binding.arg : '#999' // 缓存的最大时间，如果有用传递的，没有就用默认的10000，10秒
    const maxTime = binding.value.maxTime ? +binding.value.maxTime : 10000 // 判断是否有缓存
    if (localStorage.getItem('news_' + id)) {
        // 判断缓存有没有过期
        if (!isOverdue(id)) {
            // 有缓存且没有过期颜色设置#999
            el.style.color = color
        }
    } // 给dom添加点击事件
    el.onclick = function() {
        // 执行操作函数
        handle(id) // 设置字体颜色
        el.style.color = color // 本地存缓存，并设置过期时间
        setStorage(id, maxTime)
    }
}

export default {
    bind(el, binding) {
        // 初始化pick
        pick(el, binding)
    }, // inserted上也可以，感觉和bind区别不大 // inserted(el, binding){ //   pick(el, binding) // },
}
