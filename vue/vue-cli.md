# vue-cli3/4 使用ip, 自动启动项目

*  修改vue.config.js

``` js
module.exports = {
    devServer: {
        open: true,
        host: "192.168.1.12", //使用自己的ip
        port: 80, //使用自定义的端口
    },

}
```

*  修改package.json scripts

> serve添加--host ip

``` json
  "scripts": {
    "serve": "vue-cli-service serve --host 192.168.1.12",
  },
```

* 启动命令修改

> macOS使用80端口时, 需要使用root权限

``` shell
 sudo yarn serve # 或者 sudo npm run serve 然后输入密码即可
```
