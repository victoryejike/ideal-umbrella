<template>
  <div
    class="tabs"
    :style="width !== 0 ? {width: tabsWidth} : null"
  >
    <button
      v-for="(name, index) in titleList"
      :key="index"
      class="navs"
      :class="[{active: isActive[index]}, {fixed: width === 0}, {auto: width !== 0}]"
      :onClick="() => {toggleTab(index); execute(index)}"
      :style="width !== 0 ? {width: btnWidth} : null"
      type="button"
    >
      <span class="btn-text">
        {{ name }}
      </span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'BaseNavigationTab',
  props: {
    list: { type: Array, required: true },
    width: { type: Number, required: false, default: 0 },
    mobileMaxWidth: { type: Number, required: false, default: 30 },
    activeIndex: { type: Number, required: false, default: 0 },
  },
  data() {
    return {
      currentActiveIndex: this.activeIndex,
      functionList: [],
      isActive: [],
      titleList: [],
      dynamicWidth: this.width,
    };
  },
  computed: {
    tabsWidth() {
      return this.dynamicWidth == null
        ? null
        : `${this.dynamicWidth * this.list.length}rem`;
    },
    btnWidth() {
      return this.dynamicWidth == null
        ? null
        : `${this.dynamicWidth}rem`;
    },
  },
  created() {
    for (let i = 0; i < this.list.length; i += 1) {
      this.titleList.push((typeof this.list[i] === 'string') ? this.list[i] : this.list[i].name);
      this.functionList.push((typeof this.list[i] === 'string') ? null : this.list[i].handler);
    }
    this.isActive[this.currentActiveIndex] = true;

    this.$global.handleResponsive(this.mobileMaxWidth,
      () => { this.dynamicWidth = this.width; },
      () => { this.dynamicWidth = null; });
  },
  methods: {
    execute(index) {
      if (this.functionList[index] != null) {
        this.functionList[index]();
      }
    },
    toggleTab(index) {
      this.isActive[this.currentActiveIndex] = false;
      this.isActive[index] = true;
      this.currentActiveIndex = index;
    },
  },

};
</script>

<style scoped>
.tabs {
  background: rgba(255, 255, 255, 0.25);
  border: 0.06rem solid rgba(44, 67, 173, 0.25);
  border-radius: 0.6rem;
  display: inline-flex;
  padding: 0.25rem;
  width: 100%;
}

.navs {
  background-color: transparent;
  border-radius: 0.6rem;
  border-width: 0;
  color: rgba(44, 67, 173, 0.5);
  overflow: hidden;
  transition: all 0.5s, background-color 0s, color 0s;
}

.navs:hover {
  cursor: pointer;
}

.btn-text {
  font-size: 0.875rem;
  font-weight: bold;
  padding: 0 0.5rem;
  white-space: nowrap;
}

.active {
  background-color: #5e6ec2;
  border-radius: 0.6rem;
  color: #fff;
  transition: all 0.5s, background-color 0s, color 0s;
}

.auto {
  padding: 0.6rem 2.5rem;
}

.fixed {
  padding: 0.6rem 0;
  width: 100%;
}
</style>
