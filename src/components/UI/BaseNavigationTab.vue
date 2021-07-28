<template>
  <div
    class="tabs"
    :style="{width: tabsWidth}"
  >
    <button
      v-for="(name, index) in titleList"
      :key="index"
      class="navs"
      :class="{active: tabStatus[index]}"
      :onClick="() => {handleOnClick(index)}"
      :style="{width: btnWidth}"
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
    /*
       Handle responsive CSS via JavaScript way, default is 480px, which is
       when screen lower then 480px, then tab's width and tab button's width
       will become 100%
    */
    mobileMaxWidth: { type: Number, required: false, default: 30 },
    activeIndex: { type: Number, required: false, default: 0 },
  },
  data() {
    return {
      currentActiveIndex: this.activeIndex,
      dynamicWidth: this.width,
      functionList: [],
      tabStatus: [],
      titleList: [],
    };
  },
  computed: {
    tabsWidth() {
      return this.dynamicWidth === 0 ? '100%' : `${this.dynamicWidth * this.list.length}rem`;
    },
    btnWidth() {
      return this.dynamicWidth === 0 ? '100%' : `${this.dynamicWidth}rem`;
    },
  },
  created() {
    for (let i = 0; i < this.list.length; i += 1) {
      this.titleList.push(this.list[i]?.name);
      this.functionList.push(this.list[i]?.handler);
    }
    this.tabStatus[this.currentActiveIndex] = true;

    if (this.width !== 0) {
      this.$global.handleResponsive(this.mobileMaxWidth,
        () => { this.dynamicWidth = this.width; },
        () => { this.dynamicWidth = 0; });
    }
  },
  methods: {
    handleOnClick(index) {
      this.tabStatus[this.currentActiveIndex] = false;
      this.tabStatus[index] = true;
      this.currentActiveIndex = index;

      if (this.functionList[index] != null) {
        this.functionList[index]();
      }
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
  padding: 0.6rem 0;
  transition: all 0.5s, background-color 0s, color 0s;
}

.navs:hover {
  cursor: pointer;
}

.active {
  background-color: #5e6ec2;
  border-radius: 0.6rem;
  color: #fff;
  transition: all 0.5s, background-color 0s, color 0s;
}

.btn-text {
  font-size: 0.875rem;
  font-weight: bold;
  overflow: hidden;
  padding: 0 0.5rem;
  white-space: nowrap;
}
</style>
