<template>
  <div class="main">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>条件查询</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px" size="mini">
        <el-row>
          <el-col :span="6">
            <el-form-item label="订单编号">
              <el-input
                style="width: 200px"
                v-model="OrderQueryVo.orderSn"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单类型">
              <el-select
                v-model="OrderQueryVo.orderType"
                clearable
                placeholder="请选择"
              >
                <el-option label="正常订单" :value="0"> </el-option>
                <el-option label="秒杀订单" :value="1"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="支付方式">
              <el-select
                v-model="OrderQueryVo.payType"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in payList"
                  :key="item.status"
                  :label="item.name"
                  :value="item.status"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单状态">
              <el-select
                v-model="OrderQueryVo.status"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in statusList"
                  :key="item.status"
                  :label="item.name"
                  :value="item.status"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="end">
          <el-col :span="1.5">
            <el-button type="primary" size="mini" @click="search"
              >搜索</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button size="mini" style="margin-left: 10px" @click="reset">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card class="content">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed type="index" label="日期" width="150">
        </el-table-column>
        <el-table-column prop="orderSn" label="订单编号" width="120">
        </el-table-column>
        <el-table-column prop="payType" label="支付方式" width="120">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.payType == 0" type="info" effect="dark">
              未付款
            </el-tag>
            <el-tag
              v-if="scope.row.payType == 1"
              type=""
              effect="dark"
              font-size="50"
            >
              <i class="el-icon-pay-zfb"></i>
            </el-tag>
            <el-tag v-if="scope.row.payType == 2" type="success" effect="dark">
              <i class="el-icon-pay-wx"></i>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="订单状态" width="120">
          <template slot-scope="scope">
            <el-tag
              v-show="scope.row.status == index"
              v-for="(item, index) in statusList"
              :key="item.status"
              :type="item.type"
              :effect="item.status == 2 || item.status == 5 ? 'light' : 'dark'"
            >
              {{ item.name }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="添加时间" width="300">
        </el-table-column>
        <el-table-column prop="memberUsername" label="用户账号" width="300">
        </el-table-column>
        <el-table-column prop="orderType " label="订单类型" width="300">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.payType == 0" type="success" effect="light">
              正常订单
            </el-tag>
            <el-tag v-if="scope.row.payType == 1" type="danger" effect="light">
              秒杀订单
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="checkOrder(scope.row)"
              size="small"
              type="primary"
              icon="el-icon-view"
            >
              查看订单
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="sizes, prev, pager, next"
        :total="page.total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { findOrdersByPage } from "@/api/order/index";
export default {
  data() {
    return {
      OrderQueryVo: {
        orderSn: "",
        orderType: null,
        payType: null,
        status: "",
      },
      page: {
        start: 1,
        limit: 10,
        total: 0,
      },
      form: {},
      statusList: [
        {
          name: "待付款",
          status: 0,
          type: "danger",
        },
        {
          name: "代发货",
          status: 1,
          type: "warning",
        },
        {
          name: "已发货",
          status: 2,
          type: "",
        },
        {
          name: "已完成",
          status: 3,
          type: "",
        },
        {
          name: "已关闭",
          status: 4,
          type: "info",
        },
        {
          name: "无效订单",
          status: 5,
          type: "info",
        },
      ],
      payList: [
        {
          name: "未支付",
          status: 0,
        },
        {
          name: "支付宝",
          status: 1,
        },
        {
          name: "微信",
          status: 2,
        },
      ],
      tableData: [],
    };
  },
  created() {
    this.info();
  },
  methods: {
    info() {
      findOrdersByPage(
        this.OrderQueryVo,
        this.page.start,
        this.page.limit
      ).then((res) => {
        console.log("res==>", res);
        this.tableData = res.data.rows;
        this.page.total = res.data.total;
      });
    },
    handleSizeChange(val) {
      this.OrderQueryVo = this.$options.data().OrderQueryVo;
      console.log("limit", val);
      this.page.limit = val;
      this.info();
    },
    handleCurrentChange(val) {
      this.OrderQueryVo = this.$options.data().OrderQueryVo;
      console.log("start", val);
      this.page.start = val;
      this.info();
    },
    search() {
        this.page = this.$options.data().page;
        console.log(this.OrderQueryVo);
      this.info();  
    },
    reset(){
        this.OrderQueryVo = this.$options.data().OrderQueryVo;
        this.info();
    },
    checkOrder(ele){
        console.log(ele);
        this.$router.push({path: "detail?id="+ele.id})
    }
  },
};
</script>


<style lang="scss" scoped>
.main {
  padding: 30px;
  .box-card {
    margin-bottom: 30px;
  }
}
</style>