<template>
  <div
    :class="open ? 'faq open' : 'faq'"
    @click="$emit('toggleOpen', index)"
  >
    <div class="question">
      {{ faq.question }}
    </div>
    <div class="answer">
      {{ faq.answer }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'FAQs',
  props: {
    faq: { type: Object, required: false, default: null },
    index: { type: String, required: true },
    open: { type: Boolean, required: false, default: true },
  },
  emits: ['toggleOpen'],
};
</script>

<style scoped>
/* .tab {
  cursor: pointer;
}

.hide {
    display: none;
}

.question {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  margin-top: 2rem;
  padding: 20px;
  position: relative;
  width: 80%;
}

.question span {
  font-weight: bold;
}

.question img {
  bottom: 0.8rem;
  position: absolute;
  right: 1rem;
  width: 2rem;
}
*/
.faq {
  border-radius: 8px;
  display: block;
  margin-top: 1rem;
  width: 100%;
}

.faq .question {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  margin-top: 2rem;
  padding: 20px;
  position: relative;
  transition: all 0.4s linear;
}

.faq .question::after {
  background-image: url('../../assets/svg/dropdown.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  content: '';
  height: 2rem;
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%) rotate(0deg);
  transition: all 0.2s linear;
  width: 2rem;
}

.faq.open .question::after {
  transform: translateY(-50%) rotate(180deg);
}

.faq .answer {
  color: rgba(0, 0, 0, 0.75);
  display: none;
  font-size: 0.9rem;
  max-height: 0;
  max-width: 42rem;
  overflow-y: hidden;
  padding: 1rem;
  transition: all 0.4s ease-out;
}

.faq.open .answer {
  display: block;
  max-height: 1000px;
}
</style>
