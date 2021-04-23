<template>
  <div class="article">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <strong>条件查询</strong>
      </div>
      <div class="text item">
        <el-form
          :inline="true"
          :model="formInline"
          ref="formInline"
          size="small"
          class="demo-form-inline"
          label-width="100px"
        >
          <el-form-item label="作者">
            <el-input v-model="formInline.author" placeholder="作者"></el-input>
          </el-form-item>
          <el-form-item label="标题">
            <el-input v-model="formInline.title" placeholder="标题"></el-input>
          </el-form-item>
          <el-form-item label="编辑类型">
            <el-select
              v-model="formInline.editorType"
              placeholder="编辑类型"
            >
              <el-option label="富文本框" :value="0"></el-option>
              <el-option label="markdown" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <el-card class="content" shadow="never">
      <div slot="header" class="clearfix">
        <el-button type="primary" size="small" @click="addArticle">新增</el-button>
      </div>
      <template>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column fixed type="index" label="#" align="center">
          </el-table-column>

          <el-table-column prop="title" label="文章标题" align="center">
          </el-table-column>

          <el-table-column
            prop="coverImg"
            label="展示图片"
            width="120px"
            align="center"
          >
            <template slot-scope="scope">
              <el-image
                style="width: 100px; height: 100px"
                :src="scope.row.coverImg"
              >
              </el-image>
            </template>
          </el-table-column>

          <el-table-column prop="createTime" label="添加时间" align="center">
          </el-table-column>

          <el-table-column prop="author" label="文章作者" align="center">
          </el-table-column>

          <el-table-column prop="isShow" label="文章是否展示" align="center">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.isShow"
                :active-value="1"
                :inactive-value="0"
                @change="show(scope.row)"
              ></el-switch>
            </template>
          </el-table-column>

          <el-table-column prop="editorType" label="内容" align="center">
            <template slot-scope="scope">
              <el-tag>{{
                scope.row.editorType == 0 ? "富文本框" : "markdown"
              }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column fixed="right" label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                icon="el-icon-view"
                >
                编辑文章
              </el-button>
              <el-button type="text" @click="del(scope.row.id)" size="small" style="color: red"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30]"
          :page-size="10"
          layout="sizes, prev, pager, next"
          :total="page.total"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>
  </div>
</template>

<script>
import articleApi from "@/api/content/article";
// import {loading} from 'element-ui'
export default {
  data() {
    return {
      tableData: [],
      page: {
        total: 0,
        limit: 10,
        start: 1,
      },
      formInline: {
        author: "",
        title: "",
        editorType: "",
      },
    };
  },
  created() {
    this.info();
  },
  methods: {
    handleClick(obj) {
      console.log(obj,);
      this.$router.push({name:'EditArticle',params:{id:obj.id}})
    },
    info() {
      this.loading = true
      articleApi
        .findArticles(this.page.start, this.page.limit, this.formInline)
        .then((res) => {
          console.log(res);
          this.tableData = res.data.rows;
          this.page.total = res.data.total;
        });
        this.loading = false
    },
    onSubmit() {
      console.log("submit!");
      this.page = this.$options.data().page
      this.info();
    },
    resetForm() {
      console.log("充值", this);
      this.formInline = this.$options.data().formInline
      this.info()
    },
    show(obj) {
      console.log(obj);
      var def = !obj.isShow;
      articleApi
        .changeShow({
          id: obj.id,
          isShow: obj.isShow,
        })
        .then((res) => {
          console.log(res);
          if (res.success) {
            this.$message.success("修改文章状态成功");
          } else {
            this.$message.error("修改文章状态失败");
            obj.isShow = def;
          }
        });
    },
    handleCurrentChange(obj) {
      console.log("start", obj);
      this.page.start = obj;
      this.info();
    },
    handleSizeChange(obj) {
      console.log("limit", obj);
      this.page.limit = obj;
      this.info();
    },
    del(id){
        articleApi.delArticle(id).then(res=>{
            console.log(res);
            if(res.success){
                this.$message.success('删除成功')
                this.info()
            }else{
                this.$message.error('删除失败请重试')
            }
        })
    },
    addArticle(){
        this.$router.push({name:'AddArticle'})
    }
  },
};
</script>

<style lang="scss" scoped>
.article {
  padding: 30px;
  .box-card {
    margin-bottom: 50px;
  }
}
</style>