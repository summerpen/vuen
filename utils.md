# 十六进制颜色转rgba (安卓webview不兼容十六进制颜色(八位数)处理)

``` js
 // 十六进制颜色转rgba
 function formatColor(sHex) {
     // 十六进制颜色值的正则表达式
     var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{4}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8})$/
     /* 16进制颜色转为RGB格式 */
     var sColor = sHex.toLowerCase()
     var alpha = 1
     if (sColor && reg.test(sColor)) {
         if (sColor.length === 4 || sColor.length === 5) {
             var sColorNew = '#'
             for (var i = 1; i < sColor.length; i += 1) {
                 sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
             }
             sColor = sColorNew
         }
         // 如果有透明度再执行
         if (sColor.length === 9) {
             alpha = (parseInt('0x' + sColor.slice(7, 9)) / 255).toFixed(2)
         }
         //  处理六位的颜色值
         var sColorChange = []
         for (var i = 1; i < 7; i += 2) {
             sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
         }
         return 'rgba(' + sColorChange.join(',') + ',' + alpha + ')'
     } else {
         return sColor
     }
 }
```
