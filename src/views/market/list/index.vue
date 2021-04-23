<template>
  <div class="main">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <el-button type="primary" size="small" @click="add">新增</el-button>
      </div>
      <template>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column
            fixed
            type="index"
            label="序号"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="pic"
            label="商品图片"
            width="120"
            align="center"
          >
            <template slot-scope="scope">
              <el-image :src="scope.row.pic"></el-image>
            </template>
          </el-table-column>
          <el-table-column
            prop="time"
            label="活动时间"
            width="230"
            align="center"
          >
            <template slot-scope="scope">
              <p v-text="'开始时间：' + scope.row.promotionStartTime"></p>
              <p v-text="'结束时间：' + scope.row.promotionEndTime"></p>
            </template>
          </el-table-column>
          <el-table-column
            prop="expired"
            label="是否过期"
            width="120"
            align="center"
          >
            <template slot-scope="scope">
              <p v-text="scope.row.expired ? '已过期' : '否'"></p>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="商品名称"
            width="300"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="brandName"
            label="品牌名称"
            width="120"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="price"
            label="商品价格"
            width="120"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="productCategoryName"
            label="商品类别"
            width="120"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="promotionStartTime"
            label="创建时间"
            width="220"
            align="center"
          >
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                style="color: red"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-card>
    <detail @success="newEvent" ref="detail"></detail>
  </div>
</template>
    

<script>
import recommendApi from "@/api/market/recommend";
import detail from "./components/detail";
export default {
  components: {
    detail,
  },
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.info()
  },
  methods: {
    info() {
      var now = Date.parse(new Date());
      console.log(now);
      recommendApi.findAllRecommends().then((res) => {
        this.tableData = []
        res.data.items.forEach((ele) => {
          console.log(Date.parse(ele.modifyTime));
          var time = Date.parse(ele.promotionEndTime);
          ele.expired = now > time;
          this.tableData.push(ele);
        });
        console.log("res===>", this.tableData);
      });
    },
    newEvent(){
      this.info()
      
    },
    add() {
      this.$refs.detail.open(this.tableData);
    },
    handleClick(val){ 
      recommendApi.delRecommend(val.recommendId).then(res=>{
        console.log('del',res);
        if(res.success){
          this.$message.success('删除成功')
          this.info()
        }
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.main {
  padding: 30px;
}
</style>