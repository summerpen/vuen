<template>
    <div class='container'>
        <!-- :add8e6：传入的文本颜色
    handle：点击时进行的操作
    id：新闻的id
        maxTime：缓存的最大时间-->
        <div v-pick:add8e6='{handle:handleToPage,id:item.id,maxTime:8000}' v-for='item in data' :key='item.id' class='card'>
            <h3 class='title'>{{item.title}}</h3>
            <div class='content'>{{item.content}}</div>
        </div>
    </div>
</template>

<script>
import pick from '@/directive/pick.js'
export default {
    data() {
        return {
            data: [
                {
                    title: '这是文章标题1',
                    content: '这是文章内容',
                    id: '1',
                },
                {
                    title: '这是文章标题2',
                    content: '这是文章内容',
                    id: '2',
                },
                {
                    title: '这是文章标题3',
                    content: '这是文章内容',
                    id: '3',
                },
                {
                    title: '这是文章标题4',
                    content: '这是文章内容',
                    id: '4',
                },
                {
                    title: '这是文章标题5',
                    content: '这是文章内容',
                    id: '5',
                },
                {
                    title: '这是文章标题6',
                    content: '这是文章内容',
                    id: '6',
                },
            ],
        }
    },
    directives: {
        pick: pick,
    },
    methods: {
        handleToPage(id) {
            this.$router.push({ name: 'News', query: { id } })
        },
    },
}
</script>

<style lang="less" scoped>
.card {
    width: 400px;
    border: 1px solid #ff4400;
    margin-top: 20px;
    cursor: pointer;
}
</style>