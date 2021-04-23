<template>
  <div class="main" ref="barbox"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {};
  },
  mounted() {
    var myChart = echarts.init(this.$refs.barbox);
    var option;

    var xAxisData = [];
    var data1 = [];
    var data2 = [];
    for (var i = 0; i < 100; i++) {
      xAxisData.push("类目" + i);
      // data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      // data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data1.push(Math.ceil(Math.random() * 10));
      data2.push(Math.ceil(Math.random() * 10));
    }

    option = {
      //标题
      title: {
        text: "订单退单柱状图",
        textStyle: {
          color: "#A8AAB3", // 坐标值得具体的颜色
          fontSize: 20,
        },
      },
      // 两个按钮的样式
      legend: {
        // 对应 series里的 name
        data: ["订单", "退单"],
        // 距离底部
        bottom: 10,
        // 字体样式
        textStyle: {
          color: "#A8AAB3", // 坐标值得具体的颜色
          fontSize: 12,
        },
      },

      //右上角工具设置
      // toolbox: {
      //   // y: 'bottom',
      //   feature: {
      //     magicType: {
      //       type: ["stack", "tiled"],
      //     },
      //     dataView: {},
      //     saveAsImage: {
      //       pixelRatio: 2,
      //     },
      //   },
      // },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        splitLine: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            type: "solid",
            color: "#A8AAB3",
            width: "1",
          },
        },
        axisLabel: {
          // 坐标轴字体样式
          textStyle: {
            color: "#A8AAB3", // 坐标值得具体的颜色
            fontSize: 12,
          },
        },
      },
      yAxis: {
        splitLine: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            type: "solid",
            color: "#A8AAB3",
            width: "1",
          },
        },
        axisLabel: {
          // 坐标轴字体样式
          textStyle: {
            color: "#A8AAB3", // 坐标值得具体的颜色
            fontSize: 12,
          },
        },
      },
      series: [
        {
          name: "退单",
          type: "bar",
          data: data1,
          emphasis: {
            focus: "series",
          },
          itemStyle: {
            normal: {
              // 渐变柱状图
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#7D05E2" }, // 柱图渐变色
                { offset: 0.5, color: "#B600FF" }, // 柱图渐变色
                { offset: 1, color: "#BC04E2" }, // 柱图渐变色
              ]),
            },
          },
          animationDelay: function (idx) {
            return idx * 10;
          },
        },
        {
          name: "订单",
          type: "bar",
          data: data2,
          emphasis: {
            focus: "series",
          },
          itemStyle: {
            normal: {
              // 渐变柱状图
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#24CBFF" }, // 柱图高亮渐变色
                { offset: 0.5, color: "#24A3FF" }, // 柱图高亮渐变色
                { offset: 1, color: "#2492FF" }, // 柱图高亮渐变色
              ]),
            },
          },
          animationDelay: function (idx) {
            return idx * 10 + 100;
          },
        },
      ],
      animationEasing: "elasticOut",
      animationDelayUpdate: function (idx) {
        return idx * 5;
      },
    };

    option && myChart.setOption(option);
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 600px;
  height: 350px;
}
</style>