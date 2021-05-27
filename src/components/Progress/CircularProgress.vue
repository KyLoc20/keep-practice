<template>
  <div class="circular-progress" :style="boxSize">
    <svg viewBox="22 22 44 44" :class="classOuter">
      <circle
        :class="classInner"
        :cx="44"
        :cy="44"
        :r="strokeRadius"
        fill="none"
        :stroke="colorStroke"
        :stroke-width="strokeWidth"
        :stroke-dasharray="valueProgress"
      ></circle>
    </svg>
  </div>
</template>
<script>
// const colorMap = {
//   default:"rgba(0, 0, 0, 0.26)",
//   primary: "#1976d2",
//   secondary: "#dc004e",
// };
export default {
  name: "CircularProgress",
  props: {
    color: {
      type: String,
      required: false,
    },
    size: {
      type: Number,
      default: 16,
    },
    value: {
      required: false,
      validator: (v) => {
        return typeof v === "number" && v >= 0 && v <= 100;
      },
    },
    auto: {
      default: true,
      type: Boolean,
    },
  },
  data() {
    return {
      isIndeterminate: this.auto,
      baseCircleLength: 127,
    };
  },
  mounted() {
    console.log(this.value);
  },
  computed: {
    classOuter() {
      if (this.isIndeterminate) return "indeterminate outer-animate";
      else return "determinate";
    },
    classInner() {
      if (this.isIndeterminate) return "indeterminate inner-animate";
      else return "determinate";
    },
    colorStroke() {
      return this.color ? this.color : "currentColor";
    },
    strokeRadius() {
      //this decides the size of the circle
      return this.size;
    },
    boxSize() {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`,
      };
    },
    strokeWidth() {
      //3.6
      return 3.6;
    },
    valueProgress() {
      if (this.isIndeterminate) return "100 2000";
      else {
        let base = this.baseCircleLength;
        let progress = this.value;
        return (progress / 100) * base + " 2000";
      }
    },
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.circular-progress {
  svg {
    stroke-dasharray: 100 2000; //v1 is dash length v2 is space length(v2>=circle length=>only 1 dash)
  }
  svg.determinate {
    transform: rotate(270deg);
  }
  svg.determinate circle {
    transition: stroke-dasharray 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }
  .inner-animate {
    animation: dash 1.4s ease-in-out infinite;
  }
  .outer-animate {
    animation: rotate 1.4s linear infinite;
  }
  @keyframes dash {
    from {
      stroke-dashoffset: 100;
    }
    50% {
      stroke-dashoffset: -20;
    }
    to {
      stroke-dashoffset: -125;
    }
  }
  @keyframes rotate {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
}
</style>
