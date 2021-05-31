### Vue父组件监听子组件的生命周期

* 实现方式一

```
// Parent.vue
<Child @mounted="doSomething" />

// Child.vue
mounted() {
    this.$emit("mounted");
}
```

* 实现方式二

```
//  Parent.vue
<Child @hook:mounted="doSomething" ></Child>

doSomething() {
   console.log('父组件监听到 mounted 钩子函数 ...');
},
    
//  Child.vue
mounted(){
   console.log('子组件触发 mounted 钩子函数 ...');
},  

// 以上输出顺序为：
// 子组件触发 mounted 钩子函数 ...
// 父组件监听到 mounted 钩子函数 ..
当然 @hook 方法不仅仅是可以监听 mounted，其它的生命周期事件，例如：created，updated 等都可以监听。

```


### 发布订阅模式

```js
// 发布订阅中心, on-订阅, off取消订阅, emit发布, 内部需要一个单独事件中心caches进行存储;

interface CacheProps {
    [key: string]: Array < ((data ? : unknown) => void) > ;
}

class Observer {

    private caches: CacheProps = {}; // 事件中心

    on(eventName: string, fn: (data ? : unknown) => void) { // eventName事件名-独一无二, fn订阅后执行的自定义行为
        this.caches[eventName] = this.caches[eventName] || [];
        this.caches[eventName].push(fn);
    }

    emit(eventName: string, data ? : unknown) { // 发布 => 将订阅的事件进行统一执行
        if (this.caches[eventName]) {
            this.caches[eventName].forEach((fn: (data ? : unknown) => void) => fn(data));
        }
    }

    off(eventName: string, fn ? : (data ? : unknown) => void) { // 取消订阅 => 若fn不传, 直接取消该事件所有订阅信息
        if (this.caches[eventName]) {
            const newCaches = fn ? this.caches[eventName].filter(e => e !== fn) : [];
            this.caches[eventName] = newCaches;
        }
    }

}
class EventListener {
    listeners = {};
    on(name, fn) {
        (this.listeners[name] || (this.listeners[name] = [])).push(fn)
    }
    once(name, fn) {
        let tem = (...args) => {
            this.removeListener(name, fn)
            fn(...args)
        }
        fn.fn = tem
        this.on(name, tem)
    }
    removeListener(name, fn) {
        if (this.listeners[name]) {
            this.listeners[name] = this.listeners[name].filter(listener => (listener != fn && listener != fn.fn))
        }
    }
    removeAllListeners(name) {
        if (name && this.listeners[name]) delete this.listeners[name]
        this.listeners = {}
    }
    emit(name, ...args) {
        if (this.listeners[name]) {
            this.listeners[name].forEach(fn => fn.call(this, ...args))
        }
    }
}
```

### eventLoop

```js
console.log(1);
setTimeout(() => {
    console.log(2);
    process.nextTick(() => {
        console.log(3);
    });
    new Promise((resolve) => {
        console.log(4);
        resolve();
    }).then(() => {
        console.log(5);
    });
});
new Promise((resolve) => {
    console.log(7);
    resolve();
}).then(() => {
    console.log(8);
});
process.nextTick(() => {
    console.log(6);
});
setTimeout(() => {
    console.log(9);
    process.nextTick(() => {
        console.log(10);
    });
    new Promise((resolve) => {
        console.log(11);
        resolve();
    }).then(() => {
        console.log(12);
    });
});
// ### 1 7 8 2 4 5 9 11 12 不考虑process,在浏览器中的执行顺序
// ### 1 7 6 8 2 4 3 5 9 11 10 12 node中
```

```js
function fn() {
    // 创建两个局部变量
    const a1 = new GCSignal(1);
    const a2 = new GCSignal(2);
    global.tmp = a2;
    // 将 a2 变量赋值给全局变量
    const o = {};
    trackGarbageCollection(o, 3);
    // 跟踪局部变量 o 的 GC 状态，标识为 3
}
let obj = {};
trackGarbageCollection(obj, 4); // 跟踪变量 obj 的 GC 状态，标识为 4
fn();
// 函数内创建了 3 个局部变量 a1、a2、o
// 但是 a2 赋值给了全局变量
// 函数调用完后，a1 和 o 会被释放
%
CollectGarbage(null); // V8 Native 函数，手动触发 GC
console.log(consumeSignals()); // [1, 3]
obj = undefined;
// obj 原来的值为空对象({})，通过将 obj 设置为 undefined 回收原来的对象
%
CollectGarbage(null); // V8 Native 函数，手动触发 GC
console.log(consumeSignals()); // [4]
global.tmp = undefined; // 同上
%
CollectGarbage(null); // V8 Native 函数，手动触发 GC
console.log(consumeSignals()); // [2]
```
