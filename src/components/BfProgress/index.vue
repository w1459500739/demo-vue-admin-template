<template>
  <div class="line">
    <!-- :style="`right:${percentage}%`" -->
    <div class="num" :style="{left:right}">{{percentage}}%</div>
    <div class="content" :style="`width: ${percentage}%`"></div>
    <div class="tip" :style="{left:right}"></div>
  </div>
</template>

<script>
export default {
  props: ["percentage"],
  data() {
    return {
    };
  },
  computed:{
    right(){
      return this.percentage + '%'
    }
  }
};
</script>

<style lang="scss" scoped>
.line {
  position: relative;
  margin: 50px auto;
  border-radius: 15px;
  height: 15px;
  width: 300px;
  background-color: rgba($color: #ffffff, $alpha: .2);
  .content {
    border-radius: 15px;
    height: 100%;
    background-image: linear-gradient(to right, #24cbff 30%, #9000ff);
    transition: 2s all;
  }
  .num{
    position: absolute;
    color: #fff;
    font-size: 20px;
    top: -25px;
    margin-left: -20px;
    transition: 2s all;
  }
  .tip{
    position: absolute;
    width: 0;
    height: 0;
    bottom: -13px;
    margin-left: -10px;
    border-top: 0 solid transparent;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #fff;
    transition: 2s all;
  }
}
</style>