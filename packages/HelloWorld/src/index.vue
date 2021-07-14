<template>
  <div>hhhh</div>
</template>
<script>
export default {
  name: "HelloWorld",
  props: {
    msg: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  components: {},
  beforeMount() {},
  mounted() {
    console.log(":::", this.msg);
  },
  methods: {},
};
</script>
<style lang="less" scoped>
div {
  box-sizing: border-box;
}
</style>
