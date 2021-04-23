<template>
  <div class="main">
    <el-card class="box-card" shadow="never">
      <strong>基本信息</strong>
      <el-divider></el-divider>
      <el-form ref="form" :model="form" label-width="100px" size="small">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="商品名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="商品编码">
              <el-input v-model="form.id"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="商品分类">
              <el-select
                v-model="form.productCategoryName"
                clearable
                placeholder="商品分类"
              >
                <el-option
                  v-for="item in sortList"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="商品品牌">
              <el-select
                v-model="form.brandId"
                clearable
                placeholder="商品分类"
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
        </el-row>
        <el-form-item label="商品描述">
          <el-input
            style="width: 600px"
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="form.description"
          >
          </el-input>
        </el-form-item>

        <strong>商品属性</strong>
        <el-divider></el-divider>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="商品原价">
              <el-input-number
                v-model="form.originalPrice"
                :min="1"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="促销类型">
              <el-input v-model="form.promotionType"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="活动价格">
              <el-input-number
                v-model="form.promotionPrice"
                :min="1"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="重量(kg)">
              <el-input-number v-model="form.weight" :min="1"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="6">
            <el-form-item label="审核状态">
              <el-switch
                v-model="form.verifyStatus"
                active-value="1"
                inactive-value="0"
              >
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否上架">
              <el-switch
                v-model="form.publishStatus"
                active-value="1"
                inactive-value="0"
              >
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="缩略图" prop="coverImg">
          <el-upload
            class="avatar-uploader"
            :action="imgUploderUrl"
            :headers="headers"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            multiple
          >
            <img v-if="form.pic" :src="form.pic" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <!-- <el-button size="small" type="primary">点击上传</el-button> -->
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>

        <strong>其他信息</strong>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="8">
            <el-form-item label="推荐状态">
              <el-switch
                v-model="form.recommendStatus"
                active-value="1"
                inactive-value="0"
              >
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="新品状态">
              <el-switch
                v-model="form.newStatus"
                active-value="1"
                inactive-value="0"
              >
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="预告商品">
              <el-switch
                v-model="form.previewStatus"
                active-value="1"
                inactive-value="0"
              >
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="搜索关键词">
              <el-input v-model="form.keywords" style="width: 200px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="库存预警">
              <el-input-number
                v-model="form.lowStock"
                :min="1"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商品排序">
              <el-input-number v-model="form.sort" :min="1"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="产品服务">
          <el-checkbox-group
            v-model="form.serviceIds"
            @change="handleCheckedCitiesChange"
          >
            <el-checkbox
              v-for="city in cities"
              :label="city.id"
              :key="city.id"
              >{{ city.name }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { findAllBrand } from "@/api/market/product";
import mixin from "@/mixins/index";
export default {
  mixins: [mixin],
  data() {
    return {
      form: {
        name: "",
        id: "",
        productCategoryName: "",
        brandId: "",
        description: "",
        originalPrice: "",
        promotionType: "",
        promotionPrice: "",
        weight: 0,
        verifyStatus: null,
        publishStatus: null,
        recommendStatus: null,
        newStatus: null,
        previewStatus: null,
        keywords: "",
        lowStock: 0,
        sort: 0,
        serviceIds: [],
        pic: "",
      },
      checkedCities: [],
      cities: [
        {
          id: 1,
          name: "无忧退货",
        },
        {
          id: 2,
          name: "快速退款",
        },
        {
          id: 3,
          name: "免费包邮",
        },
      ],
      sortList: ["创意", "风格", "饰品", "灯具"],
      brandList: [],
    };
  },
  created() {
    findAllBrand().then((res) => {
      console.log("品牌列表", res);
      this.brandList = res.data.items;
    });
  },
  methods: {
    handleCheckedCitiesChange(val) {
      console.log(val, this.form.serviceIds);
    },
    handleAvatarSuccess(res) {
        console.log(res);
        if(res.success){
          this.$message.success('上传成功')
          this.form.pic = res.data.material.ossUrl
        }else{
          this.$message.error('上传失败请重试')
        }
        
    },
    getData(){
       this.form.serviceIds = this.form.serviceIds.toString()
      return this.form
    }
  },
};
</script>

<style lang="scss" scoped>
::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>