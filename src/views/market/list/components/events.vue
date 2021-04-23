<template>
  <div class="main">
    <el-dialog
      title="编辑限时活动"
      :visible.sync="dialogFormVisible"
      :append-to-body="true"
    >
      <el-form :model="form" size="small">
        <el-row type="flex" justify="space-around">
          <el-col :span="10">
            <el-form-item label="商品原价" :label-width="formLabelWidth">
              <div>{{form.price}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="商品名称" :label-width="formLabelWidth">
              <div>{{form.name}}</div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" justify="space-around">
          <el-col :span="10">
            <el-form-item label="促销价格" :label-width="formLabelWidth">
              <el-input-number
                v-model="form.promotionPrice"
                :min="1"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="排序" :label-width="formLabelWidth">
              <el-input-number
                v-model="form.sort"
                :min="1"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-around">
          <el-col :span="10">
            <el-form-item label="开始时间" :label-width="formLabelWidth">
              <el-date-picker
                v-model="form.promotionStartTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="开始时间" 
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="结束时间" :label-width="formLabelWidth">
              <el-date-picker
                v-model="form.promotionEndTime"
                type="date"
                value-format="yyyy-MM-dd "
                placeholder="结束时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" justify="space-around">
          <el-col :span="10">
            <el-form-item label="活动限购数量" :label-width="formLabelWidth">
              <el-input v-model="form.promotionPerLimit" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="商品图片" :label-width="formLabelWidth">
              <el-image :src="form.pic" style="width: 100px; height: 100px"></el-image>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addEvent"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {addRecommend} from '@/api/market/recommend'
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "100px",
      num: 1,
      form: {
        productId:"",
        price : "",
        name : "",
        promotionPrice : "",
        sort: "",
        promotionStartTime  : '',
        promotionEndTime : '',
        promotionPerLimit : "",
        pic : "",
      },
    };
  },
  created(){

  },
  methods: {
    open(obj) {
        
      console.log(obj);
      this.form.pic = obj.pic,
      this.form.name = obj.name,
      this.form.price = obj.price,
      this.form.productId = obj.id
      this.dialogFormVisible = true;
    },
    addEvent() {
        console.log(this.form);
        this.form.promotionStartTime+=' 00:00:00'
        this.form.promotionEndTime+=' 00:00:00'
        addRecommend(this.form).then(res=>{
          console.log('活动',res);
          if(res.success){
              this.$message.success('添加成功')
              this.dialogFormVisible = false;
              this.$emit('closeCard',false);
          }
      })
    },
  },
};
</script>

<style lang="scss" scoped></style>
