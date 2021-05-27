<template>
  <p><slot></slot></p>
</template>
<script>
export default {
  name: "Paragraph",
  components: {},
  // props: {
  //   content: {
  //     type: String,
  //   },
  // },
};
</script>
<style lang="less" scoped>
p {
  margin-bottom: 16px;
  font-size: 1rem;
  line-height: 1.5;
  letter-spacing: 0.00938em;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
}
</style>
