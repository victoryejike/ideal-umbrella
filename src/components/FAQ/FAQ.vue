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
  display: block;
  width: 100%;
  margin-top: 1rem;
  border-radius: 8px;
}
.faq .question {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  padding: 20px;
  position: relative;
  margin-top    : 2rem;
  transition: all 0.4s linear;
}
.faq .question::after {
  content: '';
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%) rotate(0deg);
  width: 2rem;
  height: 2rem;
  background-image: url('../../assets/svg/dropdown.svg');
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  transition: all 0.2s linear;
}
.faq.open .question::after {
  transform: translateY(-50%) rotate(180deg);
}
.faq .answer {
  color: rgba(0, 0, 0, 0.75);
  font-size: 0.9rem;
  max-width: 42rem;
  padding: 1rem;
  display: none;
  max-height: 0rem;
  overflow-y: hidden;
  transition: all 0.4s ease-out;
}
.faq.open .answer {
  display: block;
  max-height: 1000px;
}
</style>
