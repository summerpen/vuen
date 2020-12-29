import _, { cloneDeep, keyBy, isArray, isString } from "lodash";

/**
 * 按照键值合并两个对象数组
 * @param {*} arr1 数组1
 * @param {*} arr2 数组2
 * @param {*} keyArr1 数组1中的键名
 * @param {*} keyArr2 数组2中的键名
 */
//   // 合并数据,a,b合并,相同键值按照.merge后的对象(b)
//   const a = [
//     { name: "a", id: "1111", a: 1, b: 2, c: 3 },
//     { name: "b", id: "2222", a: 2 },
//     { name: "c", id: "3333", a: 3 },
// ];
// const b = [
//     { text: "vv", pid: "1111", a: {assas:1} },
//     { text: "vv", pid: "2222", a: 22 },
//     { text: "vv", pid: "3333", a: 33 },
// ];
// console.log(mergeArrByKey(a, b, "id", "pid"));
export default function mergeArrByKey(arr1, arr2, keyArr1, keyArr2 = keyArr1) {
    if (!(arr1 && arr2 && keyArr1)) {
        throw new Error("请检查参数");
    }
    if (!(isArray(arr1) && isArray(arr2))) {
        throw new Error("请传入两个数组");
    }
    if (!isString(keyArr1)) {
        throw new Error("键名必须为字符串");
    }
    const newArr = _(cloneDeep(arr1))
        .keyBy(keyArr1)
        .merge(keyBy(arr2, keyArr2))
        .values()
        .value();
    return newArr;
}
