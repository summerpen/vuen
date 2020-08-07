<template>
    <div class='container'>{{msg}}</div>
</template><script>
export default {
    data() {
        return { msg: '' }
    },
    created() {
        this.getNewsData(this.$route.query.id)
    },
    methods: {
        getNewsData(id) {
            if (!id) {
                alert('新闻id不存在，当前新闻id为：' + id)
                throw new Error('新闻id不存在，当前新闻id为：' + id)
            } else {
                this.msg = id
            }
        },
    },
}
</script>