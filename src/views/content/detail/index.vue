<template>
  <div class="detail">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <strong>新增文章</strong>
      </div>
      <div class="content">
        <el-form
          ref="ruleForm"
          :rules="rules"
          :model="from"
          label-width="120px"
        >
          <div class="title">
            <el-form-item label="作者" prop="author" size="small">
              <el-input
                placeholder="作者姓名"
                style="width: 300px"
                v-model="from.author"
              ></el-input>
            </el-form-item>
            <el-form-item label="标题" prop="title" size="small">
              <el-input
                placeholder="文章标题"
                style="width: 300px"
                v-model="from.title"
              ></el-input>
            </el-form-item>
            <el-form-item label="是否显示" prop="isShow" size="small">
              <el-switch
                :active-value="1"
                :inactive-value="0"
                v-model="from.isShow"
              >
              </el-switch>
            </el-form-item>
          </div>
          <el-form-item label="摘要" prop="summary">
            <el-input
              type="textarea"
              placeholder="摘要"
              style="width: 800px"
              v-model="from.summary"
            ></el-input>
          </el-form-item>
          <!-- 上传封面 -->
          <el-form-item label="上传封面" prop="coverImg" style="width: 400px">
            <el-upload
              class="avatar-uploader"
              :action="imgUploderUrl"
              :headers="headers"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              multiple
            >
              <img v-if="from.coverImg" :src="from.coverImg" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <!-- <el-button size="small" type="primary">点击上传</el-button> -->
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-form-item>

          <el-form-item label="切换富文本类型" size="small" prop="editorType">
            <el-radio v-model="from.editorType" :label="0">富文本框</el-radio>
            <el-radio v-model="from.editorType" :label="1">markdown</el-radio>
          </el-form-item>

          <Tinymce v-if="from.editorType == 0" ref="tinymce" />
          <MarkdownEditor v-if="from.editorType == 1" ref="markdown" />
          <el-form-item label-width="0">
            <el-button
              type="primary"
              @click="onSubmit('ruleForm')"
              :loading="btnLoding"
              >{{ id ? "保存文章" : "立即创建" }}</el-button
            >
            <el-button @click="back">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import mixin from "@/mixins/index";
import Tinymce from "@/components/Tinymce/index";
import MarkdownEditor from "@/components/MarkdownEditor/index";
import articleApi from "@/api/content/article";
export default {
  mixins: [mixin],
  components: {
    Tinymce,
    MarkdownEditor,
  },
  data() {
    return {
      btnLoding: false,
      id: null,
      from: {
        author: "",
        title: "",
        isShow: 1,
        editorType: 0,
        coverImg: "",
        summary: "",
        content1: "",
        content2: "",
      },
      rules: {
        author: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
        title: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
      },
    };
  },
  created() {
    this.id = this.$route.params.id;
    articleApi.productArticle(this.id).then((res) => {
      console.log("res===>", res);
      if (res.success) {
        Object.assign(this.from, res.data.productArticle);
        console.log("from", this.from);
        if (this.from.editorType == 0) {
          console.log("tm", this.$refs.tinymce);
          this.$nextTick(() => {
            this.$refs.tinymce.setContent(this.from.content1);
          });
        } else if (this.from.editorType == 1) {
          this.$nextTick(() => {
            this.$refs.markdown.setValue(this.from.content2);
          });
        }
      }
    });
  },
  methods: {
    handleAvatarSuccess(res, file) {
      console.log("shangchuan", res, file);
      if (res.success) {
        this.from.coverImg = res.data.material.ossUrl;
      } else {
        this.$message.error("上传失败请重试");
      }
    },
    back() {
      this.$router.push({ name: "Article" });
    },
    onSubmit(formName) {
      this.btnLoding = true;

      if (this.from.editorType == 0) {
        this.from.content1 = this.$refs.tinymce.getContent();
      } else {
        this.from.content2 = this.$refs.markdown.getValue();
      }

      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          if (this.id) {
            articleApi.updateArticle(this.from).then((res) => {
              console.log("updata", res);
              if (res.success) {
                console.log("res===>", res);
                this.$router.push({ name: "Article" });
              } else {
                this.$message.error("保存文章失败请重试");
              }
            });
          } else {
            articleApi.addArticle(this.from).then((res) => {
              if (res.success) {
                console.log("res===>", res);
                this.$router.push({ name: "Article" });
              } else {
                this.$message.error("创建文章失败请重试");
              }
            });
          }
          this.btnLoding = false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@mixin flex-center {
  display: flex;
  align-items: center;
}
.detail {
  padding: 30px;
  .content {
    .title {
      @include flex-center();
    }
  }
}
::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
::v-deep .avatar-uploader .el-upload:hover {
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
::v-deep .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>