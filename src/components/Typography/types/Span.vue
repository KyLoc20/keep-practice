<template>
  <span><slot></slot></span>
</template>
<script>
export default {
  name: "Span",
  components: {},
};
</script>
<style lang="less" scoped>
span {
  font-size: 1rem;
  line-height: 1.5;
  letter-spacing: 0.00938em;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
}
</style>
