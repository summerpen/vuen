const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}
// 引入等比适配插件
const px2rem = require('postcss-px2rem')

// 配置基本大小
const postcss = px2rem({
    // 基准大小 baseSize，需要和rem.js中相同
    remUnit: 16,
})
module.exports = {
    pages: {
        index: {
            entry: 'examples/main.ts',
            template: 'public/index.html',
            filename: 'index.html',
        },
    },
    chainWebpack: (config) => {
        // 更改@别名
        config.resolve.alias.set('@', resolve('examples'))
        // .set('assets', resolve('src/assets'))
        // .set('components', resolve('src/components'))
        // .set('layout', resolve('src/layout'))
        // .set('base', resolve('src/base'))
        // .set('static', resolve('src/static'))
        config.module
            .rule('js')
            .include.add('/packages/')
            .end()
            .use('babel')
            .loader('babel-loader')
            .tap((options) => {
                //TODO
                return options
            })
    },
    productionSourceMap: false,
    css: {
        loaderOptions: {
            postcss: {
                plugins: [postcss],
            },
        },
    },
}
