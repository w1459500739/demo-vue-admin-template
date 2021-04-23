<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>条件查询</span>
      </div>
      <el-form
        ref="form"
        :model="OrderReturnQueryVo"
        label-width="80px"
        size="mini"
      >
        <el-row>
          <el-col :span="6">
            <el-form-item label="订单编号">
              <el-input
                style="width: 200px"
                v-model="OrderReturnQueryVo.orderId"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="退单状态">
              <el-select
                v-model="OrderReturnQueryVo.status"
                clearable
                placeholder="请选择"
              >
                <el-option label="待处理" :value="0"> </el-option>
                <el-option label="退货中" :value="1"> </el-option>
                <el-option label="已完成" :value="2"> </el-option>
                <el-option label="已拒绝" :value="3"> </el-option>
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
            <el-button size="mini" style="margin-left: 10px" @click="reset"
              >重置</el-button
            >
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card class="content">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed type="index" label="#" width="150">
        </el-table-column>
        <el-table-column prop="orderId" label="订单编号" width="120">
        </el-table-column>
        <el-table-column prop="status" label="退单状态" width="120">
          <template slot-scope="scope">
            <el-tag
              v-show="item.status == scope.row.status"
              v-for="item in statusList"
              :key="item.status"
              :type="item.type"
              :effect="item.status == 2 || item.status == 3 ? 'light' : 'dark'"
            >
              {{item.name}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述" width="120">
        </el-table-column>
        <el-table-column prop="reason" label="退单原因" width="300">
        </el-table-column>
        <el-table-column prop="productName" label="商品名称" width="300">
        </el-table-column>
        <el-table-column prop="productAttr" label="商品属性" width="300">
        </el-table-column>
        <el-table-column prop="handleNote" label="商家备注" width="300">
        </el-table-column>
        <el-table-column prop="createTime" label="添加时间" width="300">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
                <el-button type="primary" size="mini" icon="el-icon-view" @click="check(scope.row)">查看订单</el-button>
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
import { findReturnApply } from "@/api/order/index";
export default {
  data() {
    return {
      page: {
        start: 1,
        limit: 10,
        total: 0,
      },
      OrderReturnQueryVo: {
        orderId: "",
        orderSn: "",
        status: null,
      },
      tableData: [],
      statusList: [
        {
          name: "待处理",
          status: 0,
          type: "danger",
        },
        {
          name: "退货中",
          status: 1,
          type: "warning",
        },
        {
          name: "已完成",
          status: 2,
          type: "",
        },
        {
          name: "已拒绝",
          status: 3,
          type: "info",
        },
      ],
    };
  },
  computed: {
    attr() {
      return;
    },
  },
  created() {
    this.info();
  },
  methods: {
    info() {
      findReturnApply(
        this.OrderReturnQueryVo,
        this.page.start,
        this.page.limit
      ).then((res) => {
        console.log("退单", res);
        this.tableData = res.data.rows;
        this.page.total = res.data.total;
        this.tableData.forEach((ele) => {
          var arr = JSON.parse(ele.productAttr);
          var attrStr = "";
          arr.forEach((ele) => {
            var str = ele.key + ":" + ele.value + " ";
            attrStr += str;
          });
          ele.productAttr = attrStr;
        });
      });
    },
    search() {
      console.log("search");
      this.page = this.$options.data().page;
      this.info();
    },
    reset() {
      this.OrderReturnQueryVo = this.$options.data().OrderReturnQueryVo;
      this.info();
      console.log("reset");
    },
    handleSizeChange(val) {
      this.page.limit = val;
      console.log("limit", val);
      this.info();
    },
    handleCurrentChange(val) {
      console.log("start", val);
      this.page.start = val;
      this.info();
    },
    check(val){
        console.log('查看详情',val);
        this.$router.push({path:'return'})
    }
  },
};
</script>

<style>
</style>