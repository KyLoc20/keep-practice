<template>
  <h1><slot></slot></h1>
</template>
<script>
export default {
  name: "Heading1",
  components: {},
  // props: {
  //   content: {
  //     type: String,
  //   },
  // },
};
</script>
<style lang="less" scoped>
h1 {
  margin: 16px 0;
  font-size: 40px;
  line-height: 46px;
  font-weight: 400;
  color: currentColor;
}
</style>
