<template>
  <h2><slot></slot></h2>
</template>
<script>
export default {
  name: "Heading2",
  components: {},
  // props: {
  //   content: {
  //     type: String,
  //   },
  // },
};
</script>
<style lang="less" scoped>
h2 {
  font-size: 30px;
  font-weight: 400;
  line-height: 1.235;
  margin: 40px 0 16px;
  color: currentColor;
}
</style>
