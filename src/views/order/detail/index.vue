<template>
  <div class="main">
    <el-card class="box-content">
      <el-steps :active="status + 1" class="steps">
        <el-step
          title="待付款"
          :description="status == 0 ? orderDetail.orderBase.createTime : ''"
        ></el-step>
        <el-step
          title="待发货"
          :description="status == 1 ? orderDetail.orderBase.createTime : ''"
        ></el-step>
        <el-step
          title="已发货"
          :description="status == 2 ? orderDetail.orderBase.createTime : ''"
        ></el-step>
        <el-step
          title="已完成"
          :description="status == 3 ? orderDetail.orderBase.createTime : ''"
        ></el-step>
        <el-step
          title="已关闭"
          :description="status == 4 ? orderDetail.orderBase.createTime : ''"
        ></el-step>
      </el-steps>
      <el-divider></el-divider>
      <div>
        <strong>订单信息：</strong>
        <el-tag
          v-show="status == index"
          v-for="(item, index) in statusList"
          :key="item.status"
          :type="item.type"
          :effect="item.status == 2 || item.status == 5 ? 'light' : 'dark'"
        >
          {{ item.name }}
        </el-tag>
      </div>
      <el-row>
        <el-col :span="6">
          <span
            >订单金额：<i style="color: red">{{
              orderDetail.orderBase.totalAmount
            }}</i></span
          >
        </el-col>
        <el-col :span="6"
          ><span>订单编号：{{ orderDetail.orderBase.orderSn }}</span></el-col
        >
        <el-col :span="6"
          ><span>用户账号：{{ orderDetail.orderBase.memberId }}</span></el-col
        >
        <el-col :span="6"
          ><span>备注：{{ orderDetail.orderBase.note }}</span></el-col
        >
      </el-row>
      <el-row>
        <el-col :span="6"
          ><span>下单时间：{{ orderDetail.orderBase.createTime }}</span></el-col
        >
        <el-col :span="6"
          ><span
            >付款时间：{{ orderDetail.orderBase.paymentTime }}</span
          ></el-col
        >
        <el-col :span="6"
          ><span
            >发货时间：{{ orderDetail.orderBase.deliveryTime }}</span
          ></el-col
        >
        <el-col :span="6"
          ><span
            >收货时间：{{ orderDetail.orderBase.receiveTime }}</span
          ></el-col
        >
      </el-row>
      <el-divider></el-divider>
      <strong>收货人信息：</strong>
      <el-row>
        <el-col :span="6"
          ><span>收货人：{{ orderDetail.orderBase.receiverName }}</span></el-col
        >
        <el-col :span="6"
          ><span
            >用户姓名：{{ orderDetail.orderBase.memberUsername }}</span
          ></el-col
        >
        <el-col :span="6"
          ><span
            >手机号码：{{ orderDetail.orderBase.receiverPhone }}</span
          ></el-col
        >
        <el-col :span="6"
          ><span
            >邮政编码：{{ orderDetail.orderBase.receiverPostCode }}</span
          ></el-col
        >
      </el-row>
      <el-row>
        <el-col :span="6"
          ><span>城市：{{ orderDetail.orderBase.receiverCity }}</span></el-col
        >
        <el-col :span="6"
          ><span
            >详细地址：{{ orderDetail.orderBase.receiverDetailAddress }}</span
          ></el-col
        >
      </el-row>
      <el-divider></el-divider>

      <strong>商品信息</strong>
      <el-table
        :border="true"
        :data="orderDetail.orderItems"
        style="width: 100%"
      >
        <el-table-column
          fixed
          align="center"
          prop="productName"
          label="商品名称"
          width="150"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="productPic"
          label="商品图片"
          width="120"
        >
          <template slot-scope="scope">
            <el-image :src="scope.row.productPic"></el-image>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="isReturn"
          label="是否退货"
          width="120"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.isReturn == 0 ? "否" : "是" }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="productBrand" label="品牌">
        </el-table-column>
        <el-table-column align="center" prop="productPrice" label="价格">
        </el-table-column>
        <el-table-column align="center" prop="productQuantity" label="商品数量">
        </el-table-column>
        <el-table-column
          align="center"
          fixed="right"
          prop="totalPrice"
          label="小计"
        >
        </el-table-column>
      </el-table>
      <el-divider></el-divider>
      <strong>费用信息</strong>
      <el-row>
        <el-col :span="6"
          ><span
            >运费金额：<i style="color: red">{{
              orderDetail.orderBase.freightAmount
            }}</i></span
          ></el-col
        >
        <el-col :span="6"
          ><span
            >订单总金额：<i style="color: red">{{
              orderDetail.orderBase.totalAmount
            }}</i></span
          ></el-col
        >
        <el-col :span="6"
          ><span
            >实际金额：<i style="color: red">{{
              orderDetail.orderBase.totalAmount
            }}</i></span
          ></el-col
        >
        <el-col :span="6"
          ><span
            >促销优化金额：<i style="color: red">{{
              orderDetail.orderBase.discountAmount
            }}</i></span
          ></el-col
        >
      </el-row>

      <el-divider></el-divider>
      <div v-if="status == 1">
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          size="mini"
        >
          <el-form-item label="审批人">
            <el-select v-model="delivery.name" clearable placeholder="请选择物流公司">
              <el-option label="顺丰快递" value="顺丰快递"></el-option>
              <el-option label="韵达快递" value="韵达快递"></el-option>
              <el-option label="中国邮政" value="中国邮政"></el-option>
              <el-option label="申通快递" value="申通快递"></el-option>
              <el-option label="中通快递" value="中通快递"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-input placeholder="请填写物流单号" v-model="delivery.id"></el-input>
          </el-form-item>
        </el-form>
        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="4"
            ><el-button type="primary" @click="send">确认发货</el-button></el-col
          >
        </el-row>
      </div>  
      <div v-if="status == 2||status == 3||status == 4">
        <strong>物流信息：<i>{{orderDetail.orderBase.deliveryCompany}}[{{orderDetail.orderBase.deliverySn}}]</i></strong>
        <el-table :border="true" :data="tabeData" style="width: 100%">
          <el-table-column prop="time" label="时间" width="180">
          </el-table-column>
          <el-table-column prop="state" label="状态" width="380">
          </el-table-column>
          <el-table-column prop="note" label="备注"> </el-table-column>
        </el-table>
        <el-row type="flex" class="row-bg" justify="center" v-if="status == 3">
          <el-col :span="4"
            ><el-button type="primary" @click="finish" size="small">关闭订单</el-button></el-col
          >
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import logistics from "@/assets/logistics.json";
import { orderDetail,sendDone,finishOrder} from "@/api/order/index";
export default {
  data() {
    return {
      orderDetail: {},
      status: null,
      tabeData: logistics,
      delivery:{
        id:"",
        name:""
      },
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
    };
  },
  computed: {},
  created() {
    console.log("wuliu", logistics);
    orderDetail(this.$route.query.id).then((res) => {
      console.log("res===>", res);
      this.orderDetail = res.data.orderDetail;
      this.status = res.data.orderDetail.orderBase.status;
      console.log("oreder==>", this.orderDetail);
    });
  },
  methods:{
    send(){
      sendDone({
        orderId:this.orderDetail.orderBase.id,
        deliverySn:this.delivery.id,
        deliveryCompany:this.delivery.name
      }).then(res=>{
        console.log('物流',res);
        if(res.success){
          location.reload()
        }
      })
    },
    finish(){
      finishOrder({
        orderId:this.orderDetail.orderBase.id
      },this.orderDetail.orderBase.id).then(res=>{
        if(res.success){
          location.reload()
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  padding: 30px;
  .box-content {
    .steps {
      padding: 30px 100px;
    }
  }
}
</style>