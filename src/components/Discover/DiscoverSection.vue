<template>
  <IndexSection
    :title="title"
    :underlined="underlined"
  >
    <template #right>
      <BaseNavigationTab
        :list="discoverTab"
        :mobile-max-width="38"
        :width="10"
      />
    </template>
    <template #content>
      <ProductGridBox
        ref="grid-box"
        class="discover-section"
        :number="number"
        :sort-method="sortMethod"
      />
    </template>
  </IndexSection>
</template>

<script>
import IndexSection from '@/components/Index/IndexSection.vue';
import ProductGridBox from '@/components/Discover/ProductGridBox.vue';

export default {
  name: 'DiscoverSection',
  components: { IndexSection, ProductGridBox },
  props: {
    number: { type: Number, required: false, default: 10 },
    title: { type: String, required: true },
    underlined: { type: Boolean, required: false, default: true },
  },
  data() {
    return {
      sortMethod: 'latest',
      discoverTab: [
        {
          name: this.$t('index_screen.discover_tab.recent'),
          handler: () => { this.sortMethod = 'latest'; },
        },
        {
          name: this.$t('index_screen.discover_tab.cheap'),
          handler: () => { this.sortMethod = 'cheapest'; },
        },
        {
          name: this.$t('index_screen.discover_tab.high'),
          handler: () => { this.sortMethod = 'highest'; },
        },
      ],
    };
  },
  computed: {
    gridbox() { return this.$refs['grid-box']; },
  },
  methods: {
    pushDataToGridBox(data) {

    },
  },
};
</script>
