<template>
  <div class="mine" ref="piebox"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  mounted() {
    var myChart = echarts.init(this.$refs.piebox);
    var option;
    option = {
      title: {
        text: "购买终端",
        // subtext: "虚构数据",
        left: "left",
        textStyle: {
          color: "#A8AAB3", // 坐标值得具体的颜色
          fontSize: 20,
        },
      },
      tooltip: {
        trigger: "item",
        formatter: "{b}数量 : {c}个; 占比({d}%)",
      },
      //   legend: {
      //     bottom: 10,
      //     left: "center",
      //     data: ["西凉", "益州", "兖州", "荆州", "幽州"],
      //   },
      series: [
        {
          type: "pie",
          radius: "45%",
          center: ["50%", "50%"],
          selectedMode: "single",
          data: [
            { value: 5, name: "Wap Web" },
            { value: 25, name: "Android" },
            { value: 20, name: "IOS" },
            { value: 15, name: "Pc Web" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
    option && myChart.setOption(option);
  },
};
</script>

<style lang="scss" scoped>
.mine {
  width: 300px;
  height: 300px;
}
</style>