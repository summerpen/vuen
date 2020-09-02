# vuen

## Project setup

``` 
yarn install
```

### Compiles and hot-reloads for development

``` 
yarn serve
```

### Compiles and minifies for production

``` 
yarn build
```

### 多环境打包设置

1. 在 package.json 中添加

``` json
"scripts":{
"build:prod": "vue-cli-service build --mode prod",
"build:test": "vue-cli-service build --mode test",
"build:aliyun": "vue-cli-service build --mode aliyun",
}
```

2. 在项目根目录下添加项目文件

> .env.prod, 文件内容如下

  >> NODE_ENV = production
  >> ...

> .env.test, 文件内容如下

 >>  NODE_ENV = production
 >> ...
