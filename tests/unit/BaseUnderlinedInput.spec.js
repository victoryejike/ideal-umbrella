import { shallowMount } from '@vue/test-utils';
import BaseUnderlinedInput from '@/components/UI/BaseUnderlinedInput.vue';

describe('BaseUnderlinedInput.vue', () => {
  it('show correct msg when mounted components', () => {
    const text = 'Username';
    const wrapper = shallowMount(BaseUnderlinedInput, {
      props: { text },
    });
    expect(wrapper.text()).toMatch(text);
  });
});
