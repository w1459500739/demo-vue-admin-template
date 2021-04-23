<template>
  <div>
    <el-card class="box-card" shadow="never">
      <span>详情描述</span>
      <el-divider></el-divider>
      <el-form ref="form" :model="form" label-width="100px" size="small">
        <el-form-item label="商品详情">
          <Tinymce ref="tm"></Tinymce>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="备注"
            v-model="form.note"
          >
          </el-input>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce/index";
export default {
  components: {
    Tinymce,
  },
  data(){
      return{
          form:{
              detailHtml:'',
              note:""
          }
      }
  },
  methods:{
      getData(){
          this.form.detailHtml = this.$refs.tm.getContent()
          return this.form
      }
  }
};
</script>

<style>
</style>