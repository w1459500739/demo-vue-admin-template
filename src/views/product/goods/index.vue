<template>
  <div class="main">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>条件查询</span>
      </div>
      <el-form
        :inline="true"
        size="mini"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-row type="flex" justify="space-between">
          <el-col>
            <el-form-item label="商品名称">
              <el-input
                v-model="formInline.name"
                placeholder="商品名称/模糊查询"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="商品货号">
              <el-input
                v-model="formInline.productSn"
                placeholder="商品货号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="品牌">
              <el-select
                v-model="formInline.brandId"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in brandList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="上架状态">
              <el-select
                v-model="formInline.publishStatus"
                clearable
                placeholder="上架状态"
              >
                <el-option label="上架" value="1"></el-option>
                <el-option label="未上架" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col>
            <el-form-item label="审核状态">
              <el-select
                v-model="formInline.verifyStatus"
                clearable
                placeholder="审核状态"
              >
                <el-option label="审核通过" value="1"></el-option>
                <el-option label="未审核" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-button @click="onSubmit(false)">取消</el-button>
              <el-button type="primary" @click="onSubmit(true)">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card class="content-card">
      <div slot="header" class="clearfix">
        <el-button type="primary" size="mini" @click="todetail">新增</el-button>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed type="index" label="序号" width="150">
        </el-table-column>
        <el-table-column prop="pic" label="商品图片" width="120">
          <template slot-scope="scope">
            <el-image :src="scope.row.pic"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名称" width="120">
        </el-table-column>
        <el-table-column prop="originalPrice" label="商品价值" width="120">
          <template slot-scope="scope">
            <p>原价：{{ scope.row.originalPrice }}</p>
            <p>现价：{{ scope.row.promotionPrice }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="productCategoryName"
          label="商品类别"
          width="120"
        >
        </el-table-column>
        <el-table-column prop="price" label="商品状态" width="120">
          <template slot-scope="scope">
            <div>
              最新：
              <el-switch
                v-model="scope.row.newStatus"
                :active-value="1"
                :inactive-value="0"
                @change="statusChange(scope.row, 0)"
              >
              </el-switch>
            </div>

            <div>
              推荐：
              <el-switch
                v-model="scope.row.recommendStatus"
                :active-value="1"
                :inactive-value="0"
                @change="statusChange(scope.row, 1)"
              ></el-switch>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="审核状态" width="120">
          <template slot-scope="scope">
            <div>
              发布：
              <el-switch
                v-model="scope.row.publishStatus"
                :active-value="1"
                :inactive-value="0"
                @change="statusChange(scope.row, 2)"
              >
              </el-switch>
            </div>

            <div>
              审核：
              <el-switch
                v-model="scope.row.verifyStatus"
                :active-value="1"
                :inactive-value="0"
                @change="statusChange(scope.row, 3)"
              ></el-switch>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="sku" width="120">
          <el-button type="text" size="small">编辑sku</el-button>
        </el-table-column>
        <el-table-column prop="weight" label="重量" width="120">
        </el-table-column>
        <el-table-column prop="sort" label="排序" width="120">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >编辑</el-button
            >
            <el-button
              type="text"
              @click="del(scope.row.id)"
              size="small"
              style="color: red"
              >删除</el-button
            >
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
import { findAllBrand } from "@/api/market/product";
import { productsByPage } from "@/api/product/goods";
import productApi from "@/api/product/goods";
export default {
  data() {
    return {
      formInline: {
        name: "",
        brandId: "",
        productSn: "",
        publishStatus: "",
        verifyStatus: "",
      },
      page: {
        start: 1,
        limit: 10,
        total: 0,
      },
      tableData: [],
      brandList: [],
    };
  },
  created() {
    //获取品牌列表
    findAllBrand().then((res) => {
      console.log("品牌", res);
      this.brandList = res.data.items;
    });

    // 获取商品列表
    this.info();
  },
  methods: {
    info() {
      productsByPage(this.page.start, this.page.limit, this.formInline).then(
        (res) => {
          console.log("商品", res);
          this.page.total = res.data.total;
          this.tableData = res.data.rows;
        }
      );
    },
    onSubmit(val) {
      if (val) {
        this.page = this.$options.data().page;
        console.log(this.$options.data());
      } else {
        this.formInline = this.$options.data().formInline;
      }
      this.info();
    },
    handleSizeChange(val) {
      console.log("limit", val);
      this.page.limit = val;
      this.info();
    },
    handleCurrentChange(val) {
      console.log("start", val);
      this.page.start = val;
      this.info();
    },
    statusChange(val, nub) {
      //nub状态码 0最新 1推荐 2发布 3审核
      console.log(val, nub);
      if (nub == 0) {
        productApi
          .switchNewStatus({
            productId: val.id,
            status: val.newStatus,
          })
          .then((res) => {
            console.log("最新", res);
            if (res.success) {
              this.$message.success("更改状态成功");
            } else {
              this.$message.error("更改状态失败请重试");
              val.newStatus = val.newStatus == 1 ? 0 : 1;
            }
          });
      } else if (nub == 1) {
        productApi
          .switchRecommandStatus({
            productId: val.id,
            status: val.recommendStatus,
          })
          .then((res) => {
            console.log("推荐", res);
            if (res.success) {
              this.$message.success("更改状态成功");
            } else {
              this.$message.error("更改状态失败请重试");
              val.recommendStatus = val.recommendStatus == 1 ? 0 : 1;
            }
          });
      } else if (nub == 2) {
        productApi
          .switchPublishStatus({
            productId: val.id,
            status: val.publishStatus,
          })
          .then((res) => {
            console.log("发布", res);
            if (res.success) {
              this.$message.success("更改状态成功");
            } else {
              this.$message.error("更改状态失败请重试");
              val.publishStatus = val.publishStatus == 1 ? 0 : 1;
            }
          });
      } else {
        productApi
          .switchVerifyStatus({
            productId: val.id,
            status: val.verifyStatus,
          })
          .then((res) => {
            console.log("审核", res);
            if (res.success) {
              this.$message.success("更改状态成功");
            } else {
              this.$message.error("更改状态失败请重试");
              val.verifyStatus = val.verifyStatus == 1 ? 0 : 1;
            }
          });
      }
    },
    del(val) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
          productApi.delProduct(val).then((res) => {
            console.log("伤处", res);
            if (res.success) {
              this.$message.success("删除成功");
              this.info();
            } else {
              this.$message.error("删除失败请重试");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    todetail(){
      this.$router.push({name:'AddDetail'})
    }
  },
};
</script>

<style lang="scss" scoped>
.main {
  padding: 30px;
  .content-card {
    margin-top: 30px;
  }
}
</style>