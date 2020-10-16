<template>
  <div class="demo-input-size">
    <div class="demo-input-smallsize">
      <div style="margin-left:15px;width:70%;display:flex;justify-content: space-between;margin-top:20px;">
        <div>姓名：</div>
        <el-input
          v-model="name"
          size="mini"
          placeholder="姓名"
        />
      </div>
      <div style="margin-left:15px;margin-top:30px;">
        <span style="margin-right:50px;">性别：</span>
        <el-radio
          v-model="sex"
          label="男"
        >男</el-radio>
        <el-radio
          v-model="sex"
          label="女"
        >女</el-radio>
      </div>
      <div style="margin-left:15px;width:70%;display:flex;justify-content: space-between;margin-top:30px;">
        <div>学院：</div>
        <el-select
          v-model="college"
          size="mini"
          placeholder="学院"
        >
          <el-option
            v-for="item in collegeoptions"
            :key="item.value"
            size="mini"
            :value="item.value"
          />
        </el-select>
      </div>
      <div style="margin-left:15px;width:70%;display:flex;justify-content: space-between;margin-top:20px;">
        <div>入职日期：</div>
        <el-input
          v-model="entryDate"
          size="mini"
          type="date"
          placeholder="入职日期"
        />
      </div>
      <div>
        <el-button
          type="primary"
          style="width:90px;height:38px;line-height:0;margin-left:500px;margin-top:50px;"
          @click="addheadmaster"
        >确定</el-button>
        <el-button
          type="warning"
          style="width:90px;height:38px;line-height:0;margin-left:10px;margin-top:50px;"
          @click="clearList"
        >清空</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { addHeadMaster } from '@/api/index'
export default {
  data() {
    return {
      name: '',
      sex: '',
      college: '',
      entryDate: '',
      collegeoptions: [
        {
          value: '数字媒体'
        },
        {
          value: '软工学院'
        },
        {
          value: '建工学院'
        },
        {
          value: '移动学院'
        },
        {
          value: '大数据学院'
        },
        {
          value: '计算机学院'
        }
      ]
    }
  },
  methods: {
    async addheadmaster() {
      const obj = {
        name: this.name,
        sex: this.sex,
        college: this.college,
        entryDate: this.entryDate
      }
      if (
        obj.name === '' ||
        obj.sex === '' ||
        obj.college === '' ||
        obj.entryDate === ''
      ) { return this.$message.error('提交信息中存在空项') }
      const { data, status } = await addHeadMaster(obj)
      if (status == 200) {
        alert(data.msg)
        this.$router.push('/headmaster/list')
      }
    },
    clearList() {
      this.name = ''
      this.sex = ''
      this.college = ''
      this.entryDate = ''
    }
  }
}
</script>
<style scoped>
.demo-input-size {
  width: 100%;
  height: 650px;
  margin-top: 15px;
}
.demo-input-smallsize {
  width: 1000px;
  height: 650px;
  margin: 0 auto;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding-top: 30px;
}
.el-input--mini {
  width: 600px;
}
.el-radio {
  margin-right: 2px;
}
.el-select {
  width: 600px;
}
</style>
