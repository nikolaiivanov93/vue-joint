<template>
  <div class="scale__container">
    <div>Zoom</div>
    <el-slider v-model="value" :step=10 :max="200" />
    <div class="scale__input">{{ value }}%</div>
    <!-- <el-input-number v-model="num" step=10 name="aasd" label='qsasdadfsadsasd%' :min="0" :max="200" @change="handleChange" /> -->
  </div>
</template>

<script>
export default {
  name: 'ScalePaper',
  data() {
    return {
      value: 100,
      num: 100,
    };
  },
  watch: {
    value() {
      this.$emit('setValueScale', this.value);
    },
  },
};
</script>
<style scoped lang="scss">
.scale {
  &__container {
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 40px;
    right: 40px;
    width: 350px;
    .el-slider {
      margin-top: 0;
      margin-left: 12px;
    }
  }
  &__input {
    margin-left: 10px;
  }
}
</style>
