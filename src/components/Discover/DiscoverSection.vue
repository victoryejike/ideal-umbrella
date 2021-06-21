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
        class="discover-section"
        :number="number"
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
      discoverTab: [
        this.$t('index_screen.discover_tab.recent'),
        this.$t('index_screen.discover_tab.cheap'),
        this.$t('index_screen.discover_tab.high'),
      ],
    };
  },
};
</script>
