<template>
  <div class="main" v-if="isShow" @click.self="close">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <strong>热销详情</strong>
      </div>
      <el-card class="search-card" shadow="never">
        <div slot="header" class="clearfix">
          <span>查询条件</span>
        </div>
        <el-form
          :inline="true"
          :model="formInline"
          size="mini"
          class="demo-form-inline"
        >
          <el-form-item>
            <el-input
              v-model="formInline.name"
              placeholder="商品名称/模糊查询"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="formInline.id" placeholder="商品id"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="formInline.brandId"
              placeholder="品牌"
              clearable
            >
              <el-option
                v-for="(item, index) in brandList"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="formInline.publishStatus"
              placeholder="上架状态"
              clearable
            >
              <el-option label="上架" :value="1"></el-option>
              <el-option label="未上架" :value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="formInline.verifyStatus"
              placeholder="审核状态"
              clearable
            >
              <el-option label="未审核" :value="0"></el-option>
              <el-option label="审核通过" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button @click="resetForm">取消</el-button>
          </el-form-item>
        </el-form>
      </el-card>

      <el-card class="content-card" shadow="never">
        <div slot="header" class="clearfix">
          <span>商品详情</span>
        </div>
        <el-table :data="tableData" style="width: 100%" height="500">
          <el-table-column fixed type="index" label="序号" align="center">
          </el-table-column>
          <el-table-column prop="coverImg" label="商品图片" align="center">
            <template slot-scope="scope">
              <el-image
                style="width: 100px; height: 100px"
                :src="scope.row.pic"
              >
              </el-image>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="商品名称" align="center">
          </el-table-column>
          <el-table-column prop="price" label="商品价格" align="center">
            <template slot-scope="scope">
              <p v-text="'原价：' + scope.row.originalPrice"></p>
              <p v-text="'现价：' + scope.row.price"></p>
            </template>
          </el-table-column>
          <el-table-column
            prop="productCategoryName"
            label="商品类别"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="id" label="商品货号" align="center">
          </el-table-column>
          <el-table-column prop="slect" label="选择" align="center">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="addEvents(scope.row)"
                >添加活动</el-button
              >
            </template>
            <events @closeCard='show' ref="event"></events>
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
    </el-card>
  </div>
</template>

<script>
import { productsByPage, findAllBrand } from "@/api/market/product";
import events from "./events";
export default {
  components: { events },
  data() {
    return {
      isShow: false,
      brandList: {},
      tableData: {},
      page: {
        total: 0,
        start: 1,
        limit: 10,
      },
      formInline: {
        brandId: "",
        name: "",
        id: "",
        publishStatus: null,
        verifyStatus: null,
      },
    };
  },
  created() {
    this.info();
    findAllBrand().then((res) => {
      console.log("品牌", res);
      this.brandList = res.data.items;
    });
  },
  methods: {
    info() {
      productsByPage(this.page.start, this.page.limit, this.formInline).then(
        (res) => {
          console.log("res===>", res);
          this.tableData = res.data.rows;
          this.page.total = res.data.total;
        }
      );
    },
    open(obj) {
      this.isShow = true;
    },
    close() {
      this.isShow = false;
    },
    show(data){
      this.$emit('success')
      this.isShow = data
    },
    addEvents(obj) {
      this.$refs.event.open(obj);
      // this.dialogFormVisible = true;
    },
    handleSizeChange(val) {
      this.page.limit = val;
      this.info();
    },
    handleCurrentChange(val) {
      this.page.start = val;
      this.info();
    },
    onSubmit() {
      this.page = this.$options.data().page;
      this.info();
    },
    resetForm() {
      this.formInline = this.$options.data().formInline;
      this.info();
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  z-index: 1001;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: scroll;
  background: rgba($color: #000000, $alpha: 0.5);
  ::v-deep .box-card {
    z-index: 1003;
    margin: 10px 100px;
    .search-card {
      margin-bottom: 20px;
    }
  }
}
</style>