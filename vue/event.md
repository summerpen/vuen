#自定义触发事件

``` js
var myEvent = new CustomEvent('deviceready', {
    detail: {
        title: 'This is title!'
    },
});
window.addEventListener('deviceready', function(event) {
    console.log('得到标题为：', event.detail.title);
});
// 随后在对应的元素上触发该事件
if (window.dispatchEvent) {
    window.dispatchEvent(myEvent);
} else {
    window.fireEvent(myEvent);
}
```
