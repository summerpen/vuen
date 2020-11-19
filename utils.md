# safari代理ie

``` 
Internet Explorer 8, Windows XP, Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0)
Internet Explorer 8, Windows Vista, Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; WOW64; Trident/4.0; )
Internet Explorer 8, Windows 7, Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0)
Internet Explorer 9, Windows Vista, Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 6.0)
Internet Explorer 9, Windows 7, Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 6.1)
Internet Explorer 10, Windows 7, Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)
Internet Explorer 10, Windows 8, Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2)
Internet Explorer 11, Windows 7, Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0)
Internet Explorer 11, Windows 8, Mozilla/5.0 (Windows NT 6.2; Trident/7.0; rv:11.0)
Internet Explorer 11, Windows 8.1, Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0)
Internet Explorer 11, Windows 10, Mozilla/5.0 (Windows NT 10.0; Trident/7.0; rv:11.0)
```

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
