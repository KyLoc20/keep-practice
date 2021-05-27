<template>
  <section class="slider">
    <div class="detection-area" :style="colorArea" @mousedown="handleActivate">
      <div class="thumb-wrapper" :style="thumbPosition">
        <span class="thumb" :class="isActive ? 'active' : ''"></span>
      </div>
      <span class="rail"></span>
      <span class="track" :style="trackLength"></span>
    </div>
    <span class="text">{{ progressText }} {{ isActive }}</span>
  </section>
</template>
<script>
export default {
  name: "Slider",
  components: {},
  props: {
    isShowDetectionArea: {
      type: Boolean,
      default: true,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      sliderLength: 134,
      thumbWrapperWidth: 28,
      progress: 0,
      isActive: false,
      throttleTimer: null,
    };
  },
  computed: {
    styleThumb() {
      return {
        left: String(this.progress * 100) + "%",
      };
    },
    thumbPosition() {
      return {
        left: `${this.progress * this.sliderLength -
          this.thumbWrapperWidth / 2}px`,
      };
    },
    trackLength() {
      return {
        width: `${this.progress * 100}%`,
      };
    },
    colorArea() {
      return {
        background: this.isShowDetectionArea ? "#1976d20a" : "transparent",
      };
    },
    progressText() {
      return `${Math.round(this.progress * 100)}%`;
    },
  },
  mounted() {
    document.addEventListener("mouseup", this.handleUnactivate, false);
    document.addEventListener("mousemove", this.handleMove, false);
    // document.onmousemove=this.move
  },
  updated() {},
  beforeDestroy() {
    console.log("beforeDestroy");
    document.removeEventListener("mouseup", this.handleUnactivate);
    document.removeEventListener("mousemove", this.handleMove);
  },
  methods: {
    initLength() {},
    update(value) {
      this.progress = this._.round(this.clamp(value, 0, 1), 2);
      console.log("update", value, this.progress);
      this.$emit("change", this.progress);
    },
    handleActivate(e) {
      this.isActive = true;
      let elBCR = e.currentTarget.getBoundingClientRect();
      this.updatePositionByClick(e.clientX, e.clientY, elBCR.left, elBCR.top);
    },
    handleUnactivate() {
      this.isActive = false;
    },
    handleMove(e) {
      if (!this.isActive || this.throttleTimer) return;
      this.throttleTimer = setTimeout(() => {
        this.throttleTimer = null;
        //throttle
        let elBCR = this.$el
          .querySelector(".detection-area")
          .getBoundingClientRect();
        this.updatePositionByDragging(
          e.clientX,
          e.clientY,
          elBCR.left,
          elBCR.top
        );
      }, 25);
    },
    updatePositionByDragging(cursorX, cursorY, sliderX, sliderY) {
      // console.log("updatePositionByClick", cursorX, sliderX, cursorY, sliderY);
      this.update((cursorX - sliderX) / this.sliderLength);
      if (!this.vertical) {
        this.update((cursorX - sliderX) / this.sliderLength);
      } else {
        this.update((cursorY - sliderY) / this.sliderLength);
      }
    },
    updatePositionByClick(cursorX, cursorY, sliderX, sliderY) {
      // console.log("updatePositionByClick", cursorX, sliderX, cursorY, sliderY);
      if (!this.vertical) {
        this.update((cursorX - sliderX) / this.sliderLength);
      } else {
        this.update((cursorY - sliderY) / this.sliderLength);
      }
    },
    clamp(number, min, max) {
      if (number < min) {
        return min;
      } else if (number > max) {
        return max;
      } else {
        return number;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.baseline {
  z-index: -10;
  position: absolute;
  background: #1976d2;
  width: 100%;
  height: 2px;
}
.slider {
  display: flex;
  color: #1976d2;
  user-select: none;
  width: 120px;
  cursor: pointer;
  height: 2px;
  padding: 13px 0;
  margin: 10px 50px;
  position: relative;
  box-sizing: content-box;
  touch-action: none;
  .detection-area {
    position: absolute;
    width: 134px;
    height: 42px;
    left: -7px;
    top: -7px;
    z-index: 10;
    .rail {
      .baseline();
      top: 50%;
      opacity: 0.38;
    }
    .track {
      .baseline();
      top: 50%;
      transition: width 50ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }
    .thumb-wrapper {
      position: absolute;
      width: 28px;
      height: 100%;
      // background: rgba(0, 0, 0, 0.4);
      &:hover .thumb {
        box-shadow: 0px 0px 0px 8px #1976d229;
      }
      transition: left 50ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      .thumb {
        position: absolute;
        width: 12px;
        height: 12px;
        top: 50%;
        left: 50%;
        margin-left: -6px;
        margin-top: -6px;
        border-radius: 50%;
        background: #1976d2;
        opacity: 1;
        transition: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        &.active {
          box-shadow: 0px 0px 0px 14px #1976d229;
        }
      }
    }
  }

  .text {
    position: absolute;
    line-height: 28px;
    top: 0;
    left: 134px;
    user-select: none;
  }
}
</style>
