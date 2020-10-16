<template>
  <div class="createClassBox">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="班级名称"
        prop="classname"
      >
        <el-input v-model="ruleForm.classname" />
      </el-form-item>
      <el-form-item
        label="创建时间"
        required
      >
        <el-col :span="11">
          <el-form-item prop="createDate">
            <el-date-picker
              v-model="ruleForm.createDate"
              type="date"
              placeholder="选择日期"
              style="width: 100%;"
            />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item
        label="讲师"
        prop="teacher"
      >
        <el-input v-model="ruleForm.teacher" />
      </el-form-item>
      <el-form-item
        label="班主任"
        prop="headmaster"
      >
        <el-input v-model="ruleForm.headmaster" />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
        >立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { createClass } from '@/api/index'
export default {
  data() {
    return {
      ruleForm: {
        classname: '',
        createDate: '',
        teacher: '',
        headmaster: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        date: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        teacher: [
          { required: true, message: '请输入讲师', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        headmaster: [
          { required: true, message: '请输入班主任', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const { data } = await createClass(this.ruleForm)
          if (data.code == 0) {
            alert(data.msg)
            this.$router.push('/class/list')
          }
        } else {
          alert(data.msg)
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style>
.createClassBox {
  width: 100%;
  height: 650px;
  margin-top: 15px;
}
.demo-ruleForm {
  width: 1000px;
  height: 650px;
  margin: 0 auto;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 30px 30px 0;
}
</style>
