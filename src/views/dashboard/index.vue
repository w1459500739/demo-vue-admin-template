<template>
  <div class="main">
    <div class="left">
      <div class="data-title">电商数据<i>Shell Data</i></div>
      <div class="number">
        <p>销售量</p>
        <p class="unit">万元</p>
      </div>
      <div class="num">
        <div class="num-box" v-for="(item, index) in num" :key="index">
          {{ item }}
        </div>
      </div>

      <div class="progress">
        <div class="title"><p>完成百分比</p></div>
        <div class="content">
          <BfProgress :percentage="lineW" />
        </div>
      </div>
      <WordEchart></WordEchart>
    </div>
    <div class="center">
      <BarBox></BarBox>
      <div class="box">
        <PieEchart></PieEchart>
        <MapEchart></MapEchart>
      </div>
    </div>
    <div class="right">
      <div class="data">
        <div class="title">统计数据<i>Statistics Data</i></div>
        <div
          v-for="item in statisticsData"
          :key="item.id"
          class="statistics-item"
        >
          <div class="left">
            <img :src="item.img" alt="" />
          </div>
          <div class="right">
            <div class="wrapper">
              <div class="value">{{ item.value }}</div>
              <div class="text">{{ item.text }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="table">
        <div class="title">大额订单Top<i>Supper Orders</i></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import BarBox from "./component/barEcharts";
import PieEchart from "./component/pieEcharts";
import MapEchart from "./component/mapEcharts";
import WordEchart from "./component/wordEcharts";
export default {
  data() {
    return {
      num: "1201028.4",
      lineW: 55,
      statisticsData: [
        {
          img: require("@/assets/icon/building.png"),
          value: 85.6,
          text: "订单总数 (万)",
          id: 1,
        },
        {
          img: require("@/assets/icon/chart.png"),
          value: 32.5,
          text: "销售总量 (万元)",
          id: 2,
        },
        {
          img: require("@/assets/icon/coin,money.png"),
          value: 92.6,
          text: "人均消费",
          id: 3,
        },
        {
          img: require("@/assets/icon/time,clock.png"),
          value: 45,
          text: "近十分钟新增订单数量",
          id: 4,
        },
      ],
    };
  },
  created() {
    console.log("echarts", echarts);
    // this.initNumChange();
    this.numChangeDelay(this.num);
    setTimeout(() => {
      this.lineW = 88;
    }, 3000);
  },
  mounted() {},
  components: {
    BarBox,
    PieEchart,
    MapEchart,
    WordEchart,
  },
  methods: {
    initNumChange() {
      // 销售量数据缓变
      this.numChangeDelay(this.num);
    },
    numChangeDelay(initNum) {
      var numStr = initNum + "";
      var arrNum = numStr.split(".");
      var mutiple = 1;
      if (arrNum[1]) {
        mutiple = 10 ** arrNum[1].length;
      }
      var endNum = Number(initNum) * mutiple;
      var startNum;
      var numTimer;
      if (endNum > 100000) {
        startNum = endNum - 100000;
        this.num = startNum / mutiple + "";
        numTimer = setInterval(() => {
          startNum += 1000;
          this.num = startNum / mutiple + "";
          if (endNum - startNum < 1000) {
            clearInterval(numTimer);
          }
        }, 10);
      } else if ((endNum > 100) & (endNum < 100000)) {
        startNum = endNum - 1000;
        this.num = startNum / mutiple + "";
        numTimer = setInterval(() => {
          startNum += 100;
          if (endNum - startNum < 100) {
            clearInterval(numTimer);
          }
        }, 10);
      }
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.main {
  background-color: #0a1631;
  display: flex;
  justify-content: space-between;
  .left {
    .number {
      display: flex;
      justify-content: space-between;
      color: #a8aab3;
      .unit {
        color: #73aae5;
      }
    }
    .data-title {
      line-height: 2;
      font-size: 20px;
      color: #a8aab3;
      font-weight: 600;
      i {
        font-weight: 100;
      }
    }
    .num {
      display: flex;
      flex-wrap: nowrap;
      .num-box {
        width: 40px;
        text-align: center;
        // padding: 5px 0;
        background-color: #0f396b;
        color: #fff;
        font-size: 55px;
        font-weight: 600;
        margin: 0 2px;
      }
    }
    .progress {
      .title {
        color: #a8aab3;
      }
    }
  }
  .center {
    .box {
      display: flex;
      justify-content: space-between;
    }
  }
  .right {
    .data {
      height: 150px;
      .title{
        line-height: 2;
        color: #a8aab3;
        font-size: 20px;
        font-weight: 600;
        i{
          font-weight: 100;
        }
      }
      .statistics-item {
        display: flex;
        align-items: center;
        float: left;
        width: 50%;
        height: 50%;
        .left {
          width: 40px;
          height: 40px;
          padding: 10px;
          border-radius: 20px;
          background-color: #fff;
          img {
            width: 20px;
            height: 20px;
          }
        }
        .right {
          color: #fff;
          .wrapper {
            margin-left: 10px;
            .value {
              font-size: 32px;
              font-weight: 600;
            }
            .text {
              font-size: 12px;
              color: #b0c2f9;
            }
          }
        }
      }
    }
  }
}
</style>