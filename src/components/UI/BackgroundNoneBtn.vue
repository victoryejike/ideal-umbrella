<template>
  <button
    :class="[{'left': float == 'left'},
             {'right': float == 'right'},
             {'none': float == 'none'}]"
  >
    {{ text }}
  </button>
</template>
<script>
export default {
  name: 'BackgroundNoneBtn',
  props: {
    text: { type: String, required: false, default: null },
    float: { type: String, required: false, default: null },
  },
};
</script>
<style scoped>
button{
    background: none;
    border: 2px solid #2C43AD;
    border-radius: 32px;
    color: #2C43AD;
    width: 80px;
    height: 30px;
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
}
.left{
    float: left;
}
.right{
    float: right;
}
.none{
    float: none;
}
</style>
