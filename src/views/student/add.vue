<template>
  <div class="studentAddform">
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
    >
      <el-form-item label="姓名">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio label="男" />
          <el-radio label="女" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="form.age" />
      </el-form-item>
      <el-form-item label="学制">
        <el-select
          v-model="form.classtype"
          placeholder="请选择学制"
        >
          <el-option
            v-for="item in form.classtypeoptions"
            :key="item.value"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="专业">
        <el-select
          v-model="form.master"
          placeholder="请选择专业"
        >
          <el-option
            v-for="item in form.masteroptions"
            :key="item.value"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="班级">
        <el-select
          v-model="form.classname"
          placeholder="请选择班级"
        >
          <el-option
            v-for="item in form.classnameoptions"
            :key="item.value"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="市场部">
        <el-select
          v-model="form.market"
          placeholder="请选择市场部"
        >
          <el-option
            v-for="item in form.marketoptions"
            :key="item.value"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="已有成绩">
        <el-input v-model="form.result" />
      </el-form-item>
      <el-form-item label="挂科次数">
        <el-input v-model="form.count" />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="addstudent"
        >添加</el-button>
        <el-button @click="clear">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addStudent } from '@/api/index'

export default {
  data() {
    return {
      form: {
        name: '',
        sex: '',
        age: '',
        classtype: '',
        master: '',
        classname: '',
        market: '',
        result: '',
        count: '',
        classtypeoptions: [
          {
            value: '一年'
          },
          {
            value: '两年'
          },
          {
            value: '三年'
          }
        ],
        masteroptions: [
          {
            value: 'web架构'
          },
          {
            value: '视觉设计'
          }
        ],
        classnameoptions: [
          {
            value: '1807A'
          },
          {
            value: '1810A'
          },
          {
            value: '1902A'
          },
          {
            value: '1905A'
          }
        ],
        marketoptions: [
          {
            value: '冀中市场部'
          },
          {
            value: '豫皖市场部'
          },
          {
            value: '邢台市场部'
          },
          {
            value: '淮南市场部'
          }
        ]
      }
    }
  },
  methods: {
    async addstudent() {
      const {
        name,
        sex,
        age,
        classtype,
        master,
        classname,
        market,
        result,
        count
      } = this.form
      const obj = {
        name,
        sex,
        age,
        classtype,
        master,
        classname,
        market,
        result,
        count
      }
      if (
        obj.name === '' ||
        obj.sex === '' ||
        obj.age === '' ||
        obj.classtype === '' ||
        obj.master === '' ||
        obj.classname === '' ||
        obj.market === '' ||
        obj.result === '' ||
        obj.count === ''
      ) { return this.$message.error('提交信息中存在空项') }
      const { data, status } = await addStudent(obj)
      if (status == 200) {
        alert(data.msg)
        this.$router.push('/student/all')
      } else {
        alert('网络错误，请稍后再试')
      }
    },
    clear() {
      this.form.name = ''
      this.form.sex = ''
      this.form.age = ''
      this.form.classtype = ''
      this.form.master = ''
      this.form.classname = ''
      this.form.market = ''
      this.form.result = ''
      this.form.count = ''
    }
  }
}
</script>

<style>
.studentAddform {
  width: 500px;
  margin: 30px;
}
</style>
