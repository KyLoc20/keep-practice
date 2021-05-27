<template>
  <section class="avatar">
    <div class="outer" :class="classAvatar">
      <img :src="src" :alt="alt" v-if="src" />
      <span class="text" v-else><slot></slot></span>
    </div>
    <badge
      v-if="badgeAvailable"
      :content="badgeContent"
      :color="badgeColor"
      :size="badgeSize"
      :visible="badgeVisible"
      :simple="badgeSimple"
      :rippleable="badgeRippleable"
    ></badge>
  </section>
</template>
<script>
import Badgeable from "@/mixins/badgeable";
export default {
  name: "Avatar",
  props: {
    //todo put src in the dir of /public and refer to them as "/xxxx.xx" or "xxxx.xx"
    src: {
      type: String,
      required: false,
    },
    alt: {
      type: String,
      required: false,
    },
    color: {
      default: "default",
      validator: (v) => {
        return (
          ["default", "primary", "secondary", "purple", "orange"].indexOf(v) !==
          -1
        );
      },
    },
    size: {
      default: "md",
      validator: (v) => {
        return ["auto", "sm", "md", "lg"].indexOf(v) !== -1;
      },
    },
  },
  mixins: [Badgeable],
  data() {
    return {};
  },
  computed: {
    classAvatar() {
      let color = this.color + "-avatar";
      let size = this.size;
      return color + " " + size;
    },
  },
  methods: {},
};
</script>
<style lang="less" scoped>
@sm-size: 24px;
@md-size: 40px;
@lg-size: 56px;
@default-color: #bdbdbd;
@primary-color: #1976d2;
@secondary-color: #dc004e;
@purple-color: #673ab7;
@orange-color: #ff5722;
.sm {
  width: @sm-size;
  height: @sm-size;
}
.md {
  width: @md-size;
  height: @md-size;
}
.lg {
  width: @lg-size;
  height: @lg-size;
}
.default-avatar {
  background: @default-color;
}
.primary-avatar {
  background: @primary-color;
}
.secondary-avatar {
  background: @secondary-color;
}
.purple-avatar {
  background: @purple-color;
}
.orange-avatar {
  background: @orange-color;
}
.avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  font-size: 10px;
  color: #fff;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  user-select: none;
  .outer {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    overflow: hidden;
    img {
      max-width: 100%;
      max-height: 100%;
    }
    .text {
      font-size: 20px;
    }
  }
  .bottom-right {
    top: auto;
    right: 14%;
    bottom: 14%;
    transform: translate(50%, 50%);
  }
  .badge {
    .bottom-right();
    box-shadow: 0 0 0 2px #fff;
  }
}
</style>
