<template>
  <div
    class="tabs"
  >
    <button
      v-for="(name, index) in titleList"
      :key="index"
      class="navs"
      :class="[{active: isActive[index]}, width === 0 ? 'auto' : 'fixed']"
      :onClick="() => {toggleTab(index),execute(index)}"
      :style="widthVars"
    >
      {{ name }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'BaseNavigationTab',
  props: {
    list: { type: Array, required: true },
    width: { type: Number, required: false, default: 0 },
  },
  data() {
    return {
      isActive: [true],
      currentActiveIndex: 0,
      titleList: [],
      functionList: [],
    };
  },
  computed: {
    widthVars() {
      return {
        '--width': `${this.width}px`,
      };
    },
  },
  created() {
    for (let i = 0; i < this.list.length; i += 1) {
      this.titleList.push((typeof this.list[i] === 'string') ? this.list[i] : this.list[i].name);
      this.functionList.push((typeof this.list[i] === 'string') ? null : this.list[i].handler);
    }
  },
  methods: {
    toggleTab(index) {
      this.isActive[this.currentActiveIndex] = false;
      this.isActive[index] = true;
      this.currentActiveIndex = index;
    },
    execute(index) {
      if (this.functionList[index] != null) { this.functionList[index](); }
    },
  },

};
</script>

<style scoped>
.tabs {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 10px;
  display: inline-flex;
  font-weight: 600;
  padding: 4px 4px 4px 4px;
}

.navs {
  background-color: transparent;
  border-width: 0;
  color: rgba(255, 255, 255, 0.5);
}

.navs:hover {
  cursor: pointer;
}

.active {
  background-color: #dcdde4;
  border-radius: 10px;
  color: #1b2143;
}

.auto {
  padding: 10px 42px 10px 42px;
}

.fixed {
  padding: 10px 0 10px 0;
  width: var(--width);
}

</style>
