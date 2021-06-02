/* let a = Symbol(1)
let str = String(a)
str.replace(/^Symbol\(/g, '').replace(/\)$/g, '') */

// 测试 GC
class MyNode {
    constructor(last) {
        this.last = last
    }
}
let node = new MyNode(null)
for (let i = 0; i < 100; i++) {
    node = new MyNode(node)
}

// 实现flat
function test27() {
    const arr = [1, 2, 3, 4, [1, 2, 3, [1, 2, 3, [1, 2, 3]]], 5, 'string', { name: '弹铁蛋同学' }]

    // 首先使用 reduce 展开一层
    arr.reduce((pre, cur) => pre.concat(cur), [])
    // [1, 2, 3, 4, 1, 2, 3, [1, 2, 3, [1, 2, 3]], 5, "string", { name: "弹铁蛋同学" }];

    // 用 reduce 展开一层 + 递归
    const flat = (arr) => {
        return arr.reduce((pre, cur) => {
            return pre.concat(Array.isArray(cur) ? flat(cur) : cur)
        }, [])
    }
    // 栈思想
    function flat1(arr) {
        const result = []
        const stack = [].concat(arr) // 将数组元素拷贝至栈，直接赋值会改变原数组
        //如果栈不为空，则循环遍历
        while (stack.length !== 0) {
            const val = stack.pop()
            if (Array.isArray(val)) {
                stack.push(...val) //如果是数组再次入栈，并且展开了一层
            } else {
                result.unshift(val) //如果不是数组就将其取出来放入结果数组中
            }
        }
        return result
    }
    const arr = [1, 2, 3, 4, [1, 2, 3, [1, 2, 3, [1, 2, 3]]], 5, 'string', { name: '弹铁蛋同学' }]
    flat1(arr)

    // 通过传入整数参数控制“拉平”层数
    // [1, 2, 3, 4, 1, 2, 3, 1, 2, 3, 1, 2, 3, 5, "string", { name: "弹铁蛋同学" }];
    // reduce + 递归
    function flat2(arr, num = 1) {
        return num > 0 ? arr.reduce((pre, cur) => pre.concat(Array.isArray(cur) ? flat2(cur, num - 1) : cur), []) : arr.slice()
    }
    const arr = [1, 2, 3, 4, [1, 2, 3, [1, 2, 3, [1, 2, 3]]], 5, 'string', { name: '弹铁蛋同学' }]
    flat2(arr, Infinity)
    // [1, 2, 3, 4, 1, 2, 3, 1, 2, 3, 1, 2, 3, 5, "string", { name: "弹铁蛋同学" }];
}

// 大数相加
function test26() {
    function bigNumAdd(num1, num2) {
        // 首先检查传来的大数是否是字符串类型，如果传Number类型的大数，在传入的时候已经丢失精度了，
        // 就如 如果传入11111111111111111，处理的时候已经是丢失精度的11111111111111112了，则需要传入
        // 字符串类型的数字 '11111111111111111'
        const checkNum = (num) => typeof num === 'string' && !isNaN(Number(num))
        if (checkNum(num1) && checkNum(num2)) {
            // 将传入的数据进行反转，从前向后依次加和，模拟个，十，百依次向上加和
            const tmp1 = num1.split('').reverse()
            const tmp2 = num2.split('').reverse()
            const result = []
            // 格式化函数，主要针对两个大数长度不一致时，超长的数字的格式化为0
            const format = (val) => {
                if (typeof val === 'number') return val
                if (!isNaN(Number(val))) return Number(val)
                return 0
            }
            let temp = 0
            // 以较长的数字为基准进行从前往后逐个加和，为避免两个数相加最高位进位后，导
            // 致结果长度大于两个数字中的长度，for循环加和长度为最长数字长度加一
            for (let i = 0; i <= Math.max(tmp1.length, tmp2.length); i++) {
                const addTmp = format(tmp1[i]) + format(tmp2[i]) + temp
                // 当加和的数字大于10的情况下，进行进位操作，将要进位的数字赋值给temp，在下一轮使用
                result[i] = addTmp % 10
                temp = addTmp > 9 ? 1 : 0
            }
            // 计算完成，反转回来
            result.reverse()
            // 将数组for中多加的一位进行处理，如果最高位没有进位则结果第一个数位0，
            // 结果第一个数位1，则发生了进位。 如99+3，最大数字长度位2,结果数长度位3
            // 此时结果的第一位为1，发生了进位，第一位保留，如果是2+94，第一位为0，则不保留第一位
            const resultNum = result[0] > 0 ? result.join('') : result.join('').slice(1)
            console.log('result', resultNum)
        } else {
            return 'big number type error'
        }
    }
}

// 给定一个数组，按找到每个元素右侧第一个比它大的数字，没有的话返回-1 规则返回一个数组
/*
 *示例：
 *给定数组：[2,6,3,8,10,9]
 *返回数组：[6,8,8,10,-1,-1]
 */

function test25() {
    // 双层循环
    /* function handleArr(arr) {
        let resultArr = []
        arr.map((item, index, _arr) => {
            let rightArr = arr.slice(index + 1)
            console.log('::::',item, rightArr)
            for (let iIndex = 0; iIndex < rightArr.length; iIndex++) {
                const element = rightArr[iIndex]
                // console.log('element::::',element)
                if (item < element) {
                    resultArr.push(element)
                    return
                }
            }
            resultArr.push(-1)
        })
        return resultArr
    }
    let arr = handleArr([2, 6, 3, 8, 10, 9])
    console.log(arr) */

    // 利用栈的特性
    function findMaxRightWithStack(array) {
        const size = array.length
        let indexArr = [0]
        let result = []
        let index = 1
        while (index < size) {
            if (indexArr.length > 0 && array[indexArr[indexArr.length - 1]] < array[index]) {
                result[indexArr[indexArr.length - 1]] = array[index]
                indexArr.pop()
            } else {
                indexArr.push(index)
                index++
            }
        }
        console.log('result:', JSON.stringify(result))
        console.log('indexArr', indexArr)
        indexArr.forEach((item) => {
            result[item] = -1
        })
        return result
    }
    console.log(findMaxRightWithStack([2, 6, 3, 8, 10, 9]))

    // 单调递减栈,反向遍历
    const firstBiggerItem = (T) => {
        const res = new Array(T.length).fill(-1)
        const stack = []
        for (let i = T.length - 1; i >= 0; i--) {
            while (stack.length && T[i] >= T[stack[stack.length - 1]]) {
                stack.pop()
            }
            if (stack.length && T[i] < T[stack[stack.length - 1]]) {
                res[i] = T[stack[stack.length - 1]]
            }
            stack.push(i)
        }
        return res
    }
    // test
    var T = [2, 6, 3, 8, 10, 9]
    // console.log(firstBiggerItem(T))
}
test25()

// 用 JavaScript 打印出一个页面, 所有以 s 和 h 开头的标签，并计算出标签的种类
function test24() {
    let el = Array.from(document.getElementsByTagName('*'))
    let hash = {}
    let reg = /^[h|s].+/gi
    el.map((item) => {
        const tagName = item.tagName
        if (reg.test(tagName)) {
            !hash[tagName] ? (hash[tagName] = 1) : hash[tagName]++
        }
    })
    console.log(hash)
}

function test23() {
    console.log(null == 0) // false
    console.log(null <= 0) // true
    console.log(null < 0) // false
    console.log(undefined == 0) // false
    console.log(undefined <= 0) // false
    console.log(undefined < 0) // false
    /**
     * 1. js中, null 不等于0,也不是0
     * 2. null值等于 undefined,剩下他俩和谁都不等
     * 3. 关系运算符中,在设计上,总是需要运算元尝试转为一个number, 而相等运算符并没有这个考虑, 所以计算null<=0 或 null>=0 时,触发 Number(null)=0
     */
}

function test22() {
    const arr1 = ['a', 'b', 'c']
    const arr2 = ['b', 'c', 'a']
    console.log(arr1.sort() === arr1) // true
    console.log(arr2.sort() == arr2) // true
    console.log(arr1.sort() === arr2.sort()) // false
}

function test21() {
    let a = []
    let b = '0'
    console.log(a == 0) // true  [] == 0            =>   [].valueOf().toString() == 0 => '' == 0    =>   Number('') == 0    => 0 == 0 true
    console.log(a == !a) // true  [] == ![](false)   =>
    console.log(b == 0) // true '0' == 0
    console.log(a == b) // false --> [] == '0'
}

function test20() {
    var obj = {}
    var x = +obj.yideng?.name ?? '京程一灯'
    console.log(x) // NaN
    // +undefined -> NaN
    //  ?? 前为 null或者undefined时,取后边的值
}

function test19() {
    function foo() {
        console.log(length)
    }
    function bar() {
        var length = '京程一灯'
        foo()
    }
    bar()
    // 输出结果是0，因为foo函数是由window对象调用，打印的length是window对象下的length属性0。foo只是在bar函数内部调用，并不是在bar函数内部声明，所以无法获取到bar函数声明的length变量
}

function test18() {
    let ydObject = { ...null, ...undefined }
    console.log(ydObject) // {}
    let ydArray = [...null, ...undefined]
    console.log(ydArray) // 报错
}

function test17() {
    const arrLike = {
        length: 4,
        0: 0,
        1: 1,
        '-1': 2,
        3: 3,
        4: 4,
    }
    console.log(Array.from(arrLike)) // [0, 1, undefined, 3]
    console.log(Array.prototype.slice.call(arrLike)) // [0, 1, empty, 3]
}
function test16() {
    let yd = { x: 1, y: 2 }
    // 以下两段代码会抛出异常吗？
    let ydWithXGetter1 = {
        ...yd,
        get x() {
            throw new Error()
        },
    }

    let ydWithXGetter2 = {
        ...yd,
        ...{
            get x() {
                throw new Error()
            },
        },
    }
}
function test15() {
    ;[typeof null, null instanceof Object]
    // ['object', false]
    /**
     * 1） typeof 返回一个表示类型的字符串.
            typeof 的结果列表
            Undefined "undefined"
            Null "object"
            Boolean "boolean"
            Number "number"
            String "string"
            Symbol "symbol"
            Function "function"
            Object "object"
        2）instanceof 运算符用来检测 constructor.prototype 是否存在于参数 object 的原型链上.
     */
}

function test14() {
    // var a = ?;

    // 解析1:
    /* var a = {
        i: 1,
        toString: function() {
            return a.i++
        },
    } */

    // 解析2:
    /*  var a = [1, 2, 3]
    a.join = a.shift */

    // 解析3
    /* var val = 0
    Object.defineProperty(window, 'a', {
        get: function() {
            return ++val
        },
    }) */

    if (a == 1 && a == 2 && a == 3) {
        console.log(1)
    }
}
function test13() {
    async function async1() {
        console.log('async1 start') // 2   2
        await async2()
        console.log('async1 end') // 7      6
    }
    async function async2() {
        console.log('async2') // 5        3
    }
    console.log('script start') // 1   1
    setTimeout(function() {
        console.log('setTimeout') // 8    8
    }, 0)
    async1() // -->
    new Promise(function(resolve) {
        console.log('promise1') // 3   4
        resolve()
    }).then(function() {
        console.log('promise2') // 6    7
    })
    console.log('script end') // 4  5
}

function test12() {
    var arr = [0, 1]
    arr[5] = 5
    newArr = arr.filter(function(x) {
        return x === undefined
    })
    console.log(newArr.length) // 0
    // filter 为数组中的每个元素调用一次 callback 函数，并利用所有使得 callback 返回 true 或等价于 true 的值的元素创建一个新数组。callback 只会在已经赋值的索引上被调用，对于那些已经被删除或者从未被赋值的索引不会被调用。那些没有通过 callback 测试的元素会被跳过，不会被包含在新数组中。
    // 也就是说 从 2-4 都是没有初始化的'坑'!, 这些索引并不存在与数组中. 在 array 的函数调用的时候是会跳过这些'坑'的.
}

function test11() {
    const value = 'Value is' + !!Number(['0']) ? 'yideng' : 'undefined'
    console.log(value) // yideng  +的优先级 大于 ? 的优先级
    // 参考 MDN https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
}

// Garbage collection 垃圾回收
function test10() {
    function test() {
        var a = 1
        return function() {
            eval('')
        }
    }
    test()
    // 不会进行垃圾回收
    // 因为eval会欺骗词法作用域，例如function test(){eval("var a = 1"},创建了一个a变量，不确定eval是否对a进行了引用，所以为了保险，不对其进行优化。
    // 相对，try catch,with也不会被回收，with会创建新的作用域。
}

// 因为eval会欺骗词法作用域，例如function test(){eval("var a = 1"},创建了一个a变量，不确定eval是否对a进行了引用，所以为了保险，不对其进行优化。
// 相对，try catch,with也不会被回收，with会创建新的作用域。

function test9() {
    console.log([2, 1, 0].reduce(Math.pow)) // 1
    console.log([].reduce(Math.pow)) // 报错
    /*  查看MDN介绍: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
    reduce的第二个参数s说明：作为第一次调用 callback函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。
    [2, 1, 0].reduce((accumulator, currentValue) => {
        console.log(accumulator, currentValue, Math.pow(accumulator, currentValue))
        return Math.pow(accumulator, currentValue)
   }, 2)
    Math.pow(2, 2) ==> 4
    Math.pow(4, 1) ==> 4
    Math.pow(4, 0) ==> 1 */
}
function test8() {
    ;['1', '2', '3'].map(parseInt)

    /**
     * 答案
        [1,NaN,NaN]

        解析
        1）Array.prototype.map()
        array.map(callback[, thisArg])
        callback函数的执行规则
        参数：自动传入三个参数
        currentValue（当前被传递的元素）；
        index（当前被传递的元素的索引）；
        array（调用map方法的数组）

        2）parseInt方法接收两个参数
        第三个参数["1", "2", "3"]将被忽略。parseInt方法将会通过以下方式被调用
        parseInt("1", 0)
        parseInt("2", 1)
        parseInt("3", 2)

        3）parseInt的第二个参数radix为0时，ECMAScript5将string作为十进制数字的字符串解析；
        parseInt的第二个参数radix为1时，解析结果为NaN；
        parseInt的第二个参数radix在2—36之间时，如果string参数的第一个字符（除空白以外），不属于radix指定进制下的字符，解析结果为NaN。
        parseInt("3", 2)执行时，由于"3"不属于二进制字符，解析结果为NaN。
     */
}

function test7() {
    const num = {
        a: 10,
        add() {
            return this.a + 2
        },
        reduce: () => this.a - 2,
    }
    console.log(num.add())
    console.log(num.reduce())
}
test7()

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
