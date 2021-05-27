<template>
  <h3><slot></slot></h3>
</template>
<script>
export default {
  name: "Heading3",
  components: {},
  // props: {
  //   content: {
  //     type: String,
  //   },
  // },
};
</script>
<style lang="less" scoped>
h3 {
  font-size: 24px;
  font-weight: 400;
  line-height: 1.334;
  margin: 40px 0 16px;
  color: currentColor;
}
</style>
