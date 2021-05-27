<template>
  <div class="divider" :class="vertical ? 'vertical' : ''"></div>
</template>
<script>
export default {
  name: "Divider",
  props: {
    vertical: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style scoped lang="less">
.divider {
  height: 1px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.12);
}
.vertical {
  width: 1px;
  height: auto;
  margin: 0 4px;
}
</style>
