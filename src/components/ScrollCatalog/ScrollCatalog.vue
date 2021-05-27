<template>
  <section class="scroll-catalog">
    <section class="title">{{ title }}</section>
    <ul class="item-container">
      <li
        v-for="(item, idx) in items"
        :key="idx"
        @click="handleSelect(item.anchor, $event)"
      >
        <router-link
          tag="div"
          class="item"
          :class="activeAnchor === item.anchor ? 'active' : 'inactive'"
          :to="{ path: '/avatar', hash: `#${item.anchor}` }"
          >{{ item.text }}</router-link
        >
      </li>
    </ul>
  </section>
</template>
<script>
export default {
  name: "ScrollCatalog",
  components: {},
  props: {
    title: {
      type: String,
    },
    //[anchor:hrefString,text:string]
    items: {
      type: Array,
    },
  },
  data() {
    return {
      selectedLabel: this.selectedOne,
      throttleTimer: null,
      activeAnchor: null, //when scrolling
    };
  },
  mounted() {
    console.log(this.items);
    document.addEventListener("scroll", this.handleScroll, true);
  },
  destroyed() {
    document.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    locateByScrolling() {
      // let scrollTop =
      //   window.pageYOffset ||
      //   document.documentElement.scrollTop ||
      //   document.body.scrollTop;

      let closestOne = null;
      let minDistance = Number.MAX_SAFE_INTEGER;
      for (let item of this.items) {
        let el = document.getElementById(item.anchor);
        if (el) {
          let top = el.getBoundingClientRect().top;
          //its negative if the el is above the viewport
          if (top > 0 && top < minDistance) {
            closestOne = item;
            minDistance = top;
          } else {
            continue;
          }
        } else {
          continue;
        }
      }
      //console.log("locateByScrolling", closestOne.anchor, minDistance);
      return closestOne ? closestOne.anchor : null;
    },
    handleScroll() {
      console.log("handleScroll");
      if (this.throttleTimer) {
        return;
      }
      this.throttleTimer = setTimeout(() => {
        this.throttleTimer = null;
        this.activeAnchor = this.locateByScrolling();
        console.log("activeAnchor", this.activeAnchor);
      }, 100);
    },
    handleSelect(anchor, e) {
      console.log("handleSelect", e, anchor);
      this.activeAnchor = anchor;
    },
  },
};
</script>
<style lang="less" scoped>
.scroll-catalog {
  display: flex;
  flex-direction: column;
  .title {
    margin-top: 16px;
    padding-left: 8px;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.5;
    letter-spacing: 0.00938em;
    margin-bottom: 0.35em;
    text-transform: capitalize;
  }
  .item-container {
    margin: 0;
    padding: 0;
    li {
      list-style: none;
    }
  }
  .item {
    flex: 1;
    text-transform: capitalize;
    padding: 4px 0px 4px 5px;
    font-size: 0.8125rem;
    line-height: 20px;
    box-sizing: border-box;
    border-left: 3px solid transparent;
    margin: 0;
    color: rgba(0, 0, 0, 0.6);
    cursor: pointer;
    user-select: none;
    transition: border 100ms cubic-bezier(0.4, 0, 0.2, 1);
    &:hover {
      border-color: #eeeeee;
    }
    &.active,
    &.active-selecting:not(.inactive) {
      border-color: #e0e0e0;
      color: rgba(0, 0, 0, 0.87);
    }

    a {
      text-decoration: none;
    }
  }
}
</style>
