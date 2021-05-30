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
        '--width': `${this.width}rem`,
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
  background: rgba(255, 255, 255, 0.25);
  border: 0.06rem solid rgba(44, 67, 173, 0.25);
  border-radius: 0.6rem;
  display: inline-flex;
  font-weight: 600;
  padding: 0.25rem 0.25rem 0.25rem 0.25rem;
}

.navs {
  background-color: transparent;
  border-width: 0;
  color: rgba(44, 67, 173, 0.5);
}

.navs:hover {
  cursor: pointer;
}

.active {
  background: #5e6ec2;
  border-radius: 0.6rem;
  color: #fff;
}

.auto {
  padding: 0.6rem 2.5rem 0.6rem 2.5rem;
}

.fixed {
  padding: 0.6rem 0 0.6rem 0;
  width: var(--width);
}

</style>
