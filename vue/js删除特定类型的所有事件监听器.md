1. 如果不拦截addEventListener调用并跟踪侦听器或使用不幸允许此类功能的库，则无法做到这一点。 如果可以访问侦听器集合但未实现该功能，那将是如此。

> 可以做的最接近的事情是通过克隆元素来删除所有侦听器，这不会克隆侦听器集合。

> 注意：这也将删除元素子元素上的侦听器。

``` js
const el = document.getElementById('el-id'),
    elClone = el.cloneNode(true);
el.parentNode.replaceChild(elClone, el);
```

2. 如果删除侦听器的唯一目标是阻止它们运行，则可以向窗口添加事件侦听器以捕获和取消给定类型的所有事件：

``` js
document.querySelector('.right').addEventListener(type, function(event) {
    event.stopPropagation();
}, true);
// document.querySelector('.right') 需要 阻止运行的元素的 父/祖先元素
//  document.querySelector('.right')改为 window时,页面所有事件都会被阻止
```

> 传入true作为第三个参数会导致事件在下降过程中被捕获。 停止传播意味着事件永远不会到达正在侦听它的侦听器。
