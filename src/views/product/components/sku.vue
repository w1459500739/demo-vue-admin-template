<template>
  <div class="main">
    <el-card class="box-card" shadow="never">
      <strong>商品sku信息</strong>
      <el-divider></el-divider>
      <el-form ref="form" :model="form" label-width="80px" size="mini">
        <el-row>
          <el-col :span="8">
            <el-form-item label="标题">
              <el-input
                v-model="form.detailTitle"
                style="width: 200px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="副标题">
              <el-input v-model="form.subTitle" style="width: 400px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- action="https://jsonplaceholder.typicode.com/posts/" -->
        <el-form-item label="画册图片">
          <el-upload
            ref="upload"
            :file-list="form.albumPics"
            :action="imgUploderUrl"
            :headers="headers"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleAvatarSuccess"
            :on-progress="progress"
          >
            <i class="el-icon-plus"></i>
          </el-upload>

          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="form.pic" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="sku设置">
          <el-form-item v-if="colorList.length > 0">
            <el-checkbox-group v-model="colors">
              <el-row>
                <el-col
                  :span="3"
                  v-for="(item, index) in colorList"
                  :key="index"
                >
                  <el-checkbox :label="item"></el-checkbox>
                  <el-button
                    size="mini"
                    type="text"
                    style="color: red; margin-left: 10px"
                    >删除</el-button
                  >
                </el-col>
              </el-row>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item v-if="sizeList.length > 0">
            <el-checkbox-group v-model="sizes">
              <el-row>
                <el-col
                  :span="3"
                  v-for="(item, index) in sizeList"
                  :key="index"
                >
                  <el-checkbox :label="item"></el-checkbox>
                  <el-button
                    size="mini"
                    type="text"
                    style="color: red; margin-left: 10px"
                    >删除</el-button
                  >
                </el-col>
              </el-row>
            </el-checkbox-group>
          </el-form-item>

          <el-row>
            <el-col :span="6">
              <el-form-item>
                <el-input
                  v-model="color"
                  style="width: 150px"
                  placeholder="颜色描述:比如土豪金"
                ></el-input>
                <el-button style="margin-left: 10px" @click="addSku(true)"
                  >创建颜色选项</el-button
                >
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <el-input
                  v-model="size"
                  style="width: 150px"
                  placeholder="大小"
                ></el-input>
                <el-button style="margin-left: 10px" @click="addSku(false)"
                  >创建大小选项</el-button
                >
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item>
                <el-button
                  type="primary"
                  style="margin-left: 30px"
                  @click="createSku"
                  >生成sku列表</el-button
                >
                <el-button
                  type="primary"
                  style="margin-left: 10px"
                  @click="addSku(false)"
                  >新增sku</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>

      <el-table
        v-if="form.skuList.length > 0"
        :data="form.skuList"
        border
        style="width: 100%"
      >
        <el-table-column fixed type="index" label="#" width="150">
        </el-table-column>
        <el-table-column prop="color" label="颜色" width="120">
        </el-table-column>
        <el-table-column prop="size" label="大小" width="120">
        </el-table-column>
        <el-table-column prop="lowStock" label="预警库存" width="120">
        </el-table-column>
        <el-table-column prop="skuCode" label="sku编码" width="300">
        </el-table-column>
        <el-table-column prop="price" label="价格" width="300">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看</el-button
            >
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import mixin from "@/mixins/index";
import { v4 as uuidv4 } from "uuid";
export default {
  mixins: [mixin],
  data() {
    return {
      form: {
        detailTitle: "",
        subTitle: "",
        pic: "",
        albumPics :[],
        skuList: [],
      },
      dialogVisible: false,
      disabled: false,
      color: "",
      colorList: [],
      size: "",
      sizeList: [],
      colors: [],
      sizes: [],
    };
  },
  methods: {
    handlePictureCardPreview(file) {
      console.log(file);
      console.log("object");
      this.dialogVisible = true;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handleAvatarSuccess(response, file, fileList) {
      // console.log(response);

      if (response.success) {
        this.form.albumPics.push(file)
      } else {
        this.$message.error("上传失败请重试");
        fileList = fileList.filter(ele=>{
          return ele.uid != file.uid
        })
        this.$refs.upload.submit(fileList)
      }
      
      console.log('fileList',this.form.albumPics);
    },
    progress(event, file, fileList) {
      // this.$refs.upload.abort(file)
      this.$nextTick(() => {
        console.log("progress", fileList);
      });
      // if(!file.response.success){
      //   this.$refs.upload.abort(file)
      // }
    },
    addSku(val) {
      if (val) {
        if (this.color) {
          this.colorList.push(this.color);
          this.color = "";
        } else {
          this.$message.error("sku不能为空");
        }
      } else {
        if (this.size) {
          this.sizeList.push(this.size);
          this.size = "";
        } else {
          this.$message.error("sku不能为空");
        }
      }
    },
    createSku() {
      var newArr = [this.colors, this.sizes];
      var arr = newArr.reduce((total, current) => {
        console.log("total", total);
        console.log("current", current);
        var list = [];
        total.forEach((inner) => {
          current.forEach((ele) => {
            if (typeof inner === "object") {
              list.push([...inner, ele]);
            } else {
              list.push([inner, ele]);
            }
          });
        });
        return list;
      });
      arr.forEach((ele) => {
        var obj = {
          lowStock: 0, //预警库存
          pic: "", //展示图片
          price: 0, //价格
          skuCode: uuidv4(), //sku编码
          stock: 0, //库存
          color: ele[0],
          size: ele[1],
        };
        this.form.skuList.push(obj);
      });
      console.log(this.form.skuList);
    },
    getData() {
      return this.form;
    },
    request() {
      console.log("自定义上传");
    },
  },
};
</script>

<style>
</style>