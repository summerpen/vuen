# 项目前置条件, vue-cli3/4 UI组件使用element(按需加载)

## 根目录下新建 directives/elTableLoadMore.js


``` js
import Vue from 'vue'
Vue.directive('loadmore', {
    bind(el, binding) {
        const selectWrap = el.querySelector('.el-table__body-wrapper')
        selectWrap.addEventListener('scroll', function() {
            if (this.scrollHeight - this.scrollTop <= this.clientHeight) {
                binding.value()
            }
        })
    },
})
```

### table组件, 懒加载的页面

``` html
<template>
    <div class='hello'>
        <h1>{{msg}}</h1>
        <el-table :data='tableData' v-loadmore='loadmore' style='width: 100%' :max-height='400'>
            <el-table-column prop='date' label='日期' width='180'></el-table-column>
            <el-table-column prop='name' label='姓名' width='180'></el-table-column>
            <el-table-column prop='address' label='地址'></el-table-column>
        </el-table>
        <hr />
        <!-- 不适用懒加载的table -->
        <el-table :data='tableData1' style='width: 100%' :max-height='100'>
            <el-table-column prop='date' label='日期' width='180'></el-table-column>
            <el-table-column prop='name' label='姓名' width='180'></el-table-column>
            <el-table-column prop='address' label='地址'></el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
// @ts-nocheck
import Vue from 'vue'
import { Table, TableColumn } from 'element-ui'
Vue.use(Table).use(TableColumn)
// 引入自定义指令
import '@/directives/elTableLoadMore'
export default Vue.extend({
    name: 'HelloWorld',
    props: {
        msg: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            tableData: [],
            tableDataAll: [],
            currentPage: 1,
            totalPage: 20,
        }
    },
    created() {
        for (let i = 1; i <= 20 * 20; i++) {
            this.tableDataAll.push({
                date: '2016-05-02',
                name: '王小虎' + i,
                address: '上海市普陀区金沙江路 1518 弄',
            })
            this.tableData = this.tableDataAll.slice(0, 20)
            this.tableData1 = this.tableDataAll.slice(0, 20)
        }
    },
    mounted() {
        // let dom = document.querySelector('.el-table__body-wrapper')
        // let that = this
        /*  dom.addEventListener('scroll', function () {
            const scrollDistance = dom.scrollHeight - dom.scrollTop - dom.clientHeight
            console.log(scrollDistance)
            if (scrollDistance <= 0) {
                console.log(11111)
                console.log(this.currentPage)
                //等于0证明已经到底，可以请求接口
                if (that.currentPage < that.totalPage) {
                    console.log(22222)
                    //当前页数小于总页数就请求
                    that.currentPage++ //当前页数自增
                    that.tableData = that.tableDataAll.slice(0, 20 * that.currentPage)
                    console.log(that.tableData)
                }
            }
        }) */
    },
    methods: {
        loadmore() {
            console.log('loadmore')
            if (this.currentPage < this.totalPage) {
                //当前页数小于
                this.currentPage++ //当前页数自增
                this.tableData = this.tableDataAll.slice(0, 20 * this.currentPage)
            }
        },
    },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>

```
