<template>
  <div
    class="tabs"
    :style="width !== 0 ? {width: `${width * list.length}rem`} : null"
  >
    <button
      v-for="(name, index) in titleList"
      :key="index"
      class="navs"
      :class="[{active: isActive[index]}, width !== 0 ? 'fixed' : 'auto']"
      :onClick="() => {toggleTab(index),execute(index)}"
      :style="width !== 0 ? {width: `${width}rem`} : null"
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
  },
  data() {
    return {
      isActive: [true],
      currentActiveIndex: 0,
      titleList: [],
      functionList: [],
    };
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
  padding: 0.25rem;
}

.navs {
  background-color: transparent;
  border-radius: 0.6rem;
  border-width: 0;
  color: rgba(44, 67, 173, 0.5);
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all 0.5s, background-color 0s, color 0s;
}

.navs:hover {
  cursor: pointer;
}

.btn-text {
  font-size: 0.9rem;
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
}

@media (max-width: 30em) {
  .tabs {
    width: 100%;
  }

  .fixed {
    width: 100%;
  }
}
</style>
