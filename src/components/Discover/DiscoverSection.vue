<template>
  <IndexSection
    :title="title"
    :underlined="underlined"
  >
    <template #right>
      <BaseNavigationTab
        v-if="underlined"
        :mobile-max-width="38"
        :style="{'pointer-events':($refs['grid-box']?.isLoading) ? 'none': 'auto'}"
        :width="9"
      />
      <BaseNavigationTab
        v-else
        :list="discoverTab"
        :mobile-max-width="38"
        :style="{'pointer-events':($refs['grid-box']?.isLoading) ? 'none': 'auto'}"
        :width="9"
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
    search: { type: String, required: false, default: '' },
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
};
</script>
