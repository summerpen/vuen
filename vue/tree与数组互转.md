``` js
function convert(list) {
    const res = [];
    const map = list.reduce((res, v) => (res[v.id] = v, res), {});
    for (const item of list) {
        if (item.parent_id === 0) {
            res.push(item);
            continue;
        }
        if (item.parent_id in map) {
            const parent = map[item.parent_id];
            parent.children = parent.children || [];
            parent.children.push(item);
        }
    }
    return res;
}
let returnTree = convert(flatArr);
console.log(returnTree);
```

```js 
function flatten(data) {
  return data.reduce((arr, {id, title, pid, children = []}) =>

    arr.concat([{id, title, pid}], flatten(children)), []);

}
let flatArr = flatten(JsonTree); 
console.log(flatArr)

```
