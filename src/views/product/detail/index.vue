<template>
  <div class="main">
    <el-steps
      class="steps"
      :active="active"
      finish-status="success"
      :space="500"
      align-center
    >
      <el-step title="商品基本信息"></el-step>
      <el-step title="添加库存信息"></el-step>
      <el-step title="添加移动端详情"></el-step>
    </el-steps>
    <div class="content">
      <Basic ref="basic" v-show="active == 1"></Basic>
      <Sku ref="sku" v-show="active == 2"></Sku>
      <Detail ref="del" v-show="active == 3"></Detail>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="2" v-if="active > 1">
          <el-button class="next" type="primary" plain @click="toPre">
            上一步
          </el-button>
        </el-col>
        <el-col :span="2" v-if="active != 3">
          <el-button class="next" type="primary" @click="toNext">
            下一步
          </el-button>
        </el-col>
        <el-col :span="2" v-if="active == 3">
          <el-button class="next" type="primary" @click="submit">
            提交保存
          </el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Basic from "../components/basic";
import Sku from "../components/sku";
import Detail from "../components/detail";
import { addProductAndSkus } from "@/api/product/goods";
export default {
  data() {
    return {
      active: 1,
      ProductAndSkusVo: {
        pmsSkuStockList: [],
        product: {},
      },
    };
  },
  components: {
    Basic,
    Sku,
    Detail,
  },
  methods: {
    toNext() {
      this.active++;
    },
    toPre() {
      this.active--;
    },
    submit() {
      console.log("del", this.$refs.del.getData());
      console.log("basic", this.$refs.basic.getData());
      console.log("sku", this.$refs.sku.getData());
      var delData = this.$refs.del.getData();
      var bacData = this.$refs.basic.getData();
      var skuData = this.$refs.sku.getData();
      var obj = {
        detailTitle:skuData.detailTitle,
        subTitle:skuData.subTitle,
      }
      this.ProductAndSkusVo.pmsSkuStockList = skuData.skuList;
      Object.assign(
        this.ProductAndSkusVo.product,
        bacData,
        delData,
        obj
      );  
      console.log(this.ProductAndSkusVo.product);
      addProductAndSkus(this.ProductAndSkusVo).then(res=>{
        console.log('res==>',res);
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  .steps {
    // width: fit-content;
    padding: 30px 0;
  }
  .content {
    margin: 0 30px;
    .next {
      margin: 30px;
    }
  }
}
</style>