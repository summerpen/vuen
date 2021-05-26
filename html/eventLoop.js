/* let a = Symbol(1)
let str = String(a)
str.replace(/^Symbol\(/g, '').replace(/\)$/g, '') */

function test6() {
    var foo = {
        bar: function() {
            return this.baz
        },
        baz: 1,
    }
    console.log(typeof (f = foo.bar)())
}

function test5() {
    function f() {
        return f
    }
    console.log(new f() instanceof f)
    // a instanceof b 用于检测a是不是b的实例。如果题目f中没有return f,则答案明显为true;而在本题中new f()其返回的结果为f的函数对象，其并不是f的一个实例。

    //new f() 返回的是 f 这个函数对象。 而 o instanceOf O的实现原理是，检测o的原型链上有没有O.prototype 即 o.proto == O.prototype || o.proto.proto == O.prototype。调试可以看出，两者并不相同。
}

function test4() {
    var x = 1
    if (function f() {}) {
        x += typeof f
    }
    console.log(x)
}

function test3() {
    var foo = function bar() {
        return 12
    }
    console.log(typeof bar()) //输出是抛出异常，bar is not defined。
}

function test3() {
    var company = {
        address: 'beijing',
    }
    var yideng = Object.create(company)
    delete yideng.address
    console.log(yideng.address) // beijing 找到了其原型对象上的 address 属性
}

function test2() {
    var fullname = 'a'
    var obj = {
        fullname: 'b',
        prop: {
            fullname: 'c',
            getFullname: function() {
                return this.fullname
            },
        },
    }

    console.log(obj.prop.getFullname()) // c
    var test = obj.prop.getFullname
    console.log(test()) // a
}

function iife() {
    var a = 1
    console.log(a)
    ;(function a() {
        a = 2
        console.log(a)
    })()
}
// iife()  // 输出函数本身

function test1() {
    var a = [0]
    if (a) {
        console.log(a == true)
    } else {
        console.log(a)
    }
    // 输出false
}

//
// Math.min 的参数是 0 个或者多个，如果多个参数很容易理解，返回参数中最小的。如果没有参数，则返回 Infinity，无穷大。
// 而 Math.max 没有传递参数时返回的是-Infinity.所以输出 false
function minMax() {
    var min = Math.min()
    max = Math.max()
    console.log(min < max)
}
// minMax()

function sideFun() {
    function side(arr) {
        arr[0] = arr[2]
    }
    function a(a, b, c = 3) {
        c = 10
        side(arguments)
        // 1, 1, 10
        return a + b + c
    }
    let result = a(1, 1, 1)
    console.log(result) // 12
}
// sideFun()
function eventLoop() {
    console.log(1)
    setTimeout(() => {
        console.log(2)
        process.nextTick(() => {
            console.log(3)
        })
        new Promise((resolve) => {
            console.log(4)
            resolve()
        }).then(() => {
            console.log(5)
        })
    })
    new Promise((resolve) => {
        console.log(7)
        resolve()
    }).then(() => {
        console.log(8)
    })
    process.nextTick(() => {
        console.log(6)
    })
    setTimeout(() => {
        console.log(9)
        process.nextTick(() => {
            console.log(10)
        })
        new Promise((resolve) => {
            console.log(11)
            resolve()
        }).then(() => {
            console.log(12)
        })
    })
}
