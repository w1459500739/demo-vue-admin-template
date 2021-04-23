<template>
  <div class="main" ref="wordbox"></div>
</template>

<script>
import * as echarts from "echarts";
require("echarts-wordcloud");
export default {
  data() {
    return {};
  },
  mounted() {
      this.info()
  },
  methods: {
    info() {
      var chart = echarts.init(this.$refs.wordbox);

      var option = {
          title: {
        text: "热门搜索词",
        // subtext: "Top Search",
        left: "left",
        textStyle: {
          color: "#A8AAB3", // 坐标值得具体的颜色
          fontSize: 20,
        },
      },
        tooltip: {
          show: true,
        },
        series: [
          {
            type: "wordCloud",
            gridSize: 6,
            shape: "diamond",
            sizeRange: [30, 60],
            width: 800,
            height: 500,
            textStyle: {
              normal: {
                color: function () {
                  return (
                    "rgb(" +
                    [
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160),
                    ].join(",") +
                    ")"
                  );
                },
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: "#333",
              },
            },
            data: [
              {
                name: " 特斯拉Model S",
                value: 30,
              },
              {
                name: "天生要强",
                value: 24,
              },
              {
                name: " 华为p20",
                value: 21,
              },
              {
                name: "杜兰特",
                value: 19,
              },
              {
                name: "三只松鼠",
                value: 18,
              },
              {
                name: "Mac Pro",
                value: 18,
              },
              {
                name: "Iphone12 Pro",
                value: 17,
              },
              {
                name: "玛莎拉蒂",
                value: 12,
              },
              {
                name: "小米手机",
                value: 12,
              },
              {
                name: "保时捷",
                value: 11,
              },
            ],
          },
        ],
      };
      chart.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
    .main{
      // background-color: #fff;
        width: 100%;
        height: 500px;
    }
</style>