<template>
  <section class="loading-effect">
    <span class="text" v-if="indicator">{{indicator}}</span>
    <CircularAnimation v-else></CircularAnimation>
  </section>
</template>
<script>
import CircularAnimation from "../../components/Progress/CircularProgress";
export default {
  name: "LoadingEffect",
  components: { CircularAnimation },
  props: {
    indicator: {
      required: false,
      type: String,
    },
  },
  data() {
    return {};
  },
  computed: {},
};
</script>
<style lang="less" scoped>
.loading-effect {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items:center;
  width: 100%;
  height:100%;
  //todo what if indicator text is longer than content text
}
</style>
