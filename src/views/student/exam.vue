<template>
  <div>
    <el-table
      :data="data"
      style="width: 100%"
    >
      <el-table-column
        prop="studentID"
        label="学号"
        sortable
      />
      <el-table-column
        prop="name"
        label="姓名"
        sortable
      />
      <el-table-column
        prop="sex"
        label="性别"
        sortable
      />
      <el-table-column
        prop="age"
        label="年龄"
        sortable
      />
      <el-table-column
        prop="study"
        label="学制"
        sortable
      />
      <el-table-column
        prop="major"
        label="专业"
        sortable
      />
      <el-table-column
        prop="classes"
        label="班级"
        sortable
      />
      <el-table-column
        prop="citycenter"
        label="市场部"
        sortable
      />
      <el-table-column
        prop="chengji"
        label="当前成绩"
        sortable
      />
      <el-table-column
        prop="graduation"
        label="还差成绩"
        sortable
      />
      <el-table-column
        prop="failss"
        label="挂科次数"
        sortable
      />
    </el-table>
    <el-button
      style="margin:0 0 20px 20px;"
      type="primary"
      icon="el-icon-document"
      @click="handleDownload"
    >
      Export Excel
    </el-button>
    <div class="index">
      <el-upload
        ref="upload"
        action="/"
        :show-file-list="false"
        :on-change="importExcel"
        :auto-upload="false"
      >
        <el-button
          icon="el-icon-upload"
          size="small"
          type="primary"
        >
          导入
        </el-button>
      </el-upload>
    </div>
  </div>
</template>
<script>
import { getAllStudents, excel } from '../../api/exam'
import { parseTime } from '@/utils'
import XLSX from 'xlsx'

export default {
  data() {
    return {
      data: [],
      page: 1,
      pageSize: 1,
      // 表格
      autoWidth: true,
      bookType: 'xlsx'
    }
  },
  created() {
    this.getallstudents()
  },
  methods: {
    async getallstudents() {
      const { data } = await getAllStudents(this.page, this.pageSize)
      this.data = data.data
    },
    // 导入
    importExcel(file) {
      const types = file.name.split('.')[1]
      const fileType = ['xlsx', 'xlc', 'xlm', 'xls', 'xlt', 'xlw', 'csv'].some(
        item => item === types
      )
      if (!fileType) {
        this.$message('格式错误！请重新选择')
        return
      }
      this.file2Xce(file).then(async tabJson => {
        if (tabJson && tabJson.length > 0) {
          this.xlsxJson = tabJson
          const arr = []
          for (let i = 0; i <= this.xlsxJson.length; i++) {
            const obj = {
              studentID: this.xlsxJson[0].sheet[i]['学号'],
              name: this.xlsxJson[0].sheet[i]['姓名'],
              sex: this.xlsxJson[0].sheet[i]['性别'],
              age: this.xlsxJson[0].sheet[i]['年龄'],
              study: this.xlsxJson[0].sheet[i]['学制'],
              major: this.xlsxJson[0].sheet[i]['专业'],
              classes: this.xlsxJson[0].sheet[i]['班级'],
              citycenter: this.xlsxJson[0].sheet[i]['市场部'],
              chengji: this.xlsxJson[0].sheet[i]['当前成绩'],
              graduation: this.xlsxJson[0].sheet[i]['还差成绩'],
              failss: this.xlsxJson[0].sheet[i]['挂科次数']
            }
            arr.push(obj)
          }
          const data = await excel(arr)
          this.data = data.data.data
        }
      })
    },
    file2Xce(file) {
      return new Promise(function(resolve, reject) {
        const reader = new FileReader()
        reader.onload = function(e) {
          const data = e.target.result
          this.wb = XLSX.read(data, {
            type: 'binary'
          })
          const result = []
          this.wb.SheetNames.forEach(sheetName => {
            result.push({
              sheetName: sheetName,
              sheet: XLSX.utils.sheet_to_json(this.wb.Sheets[sheetName])
            })
          })
          resolve(result)
        }
        reader.readAsBinaryString(file.raw)
      })
    },
    // 导出
    handleDownload() {
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = [
          '学号',
          '姓名',
          '性别',
          '年龄',
          '学制',
          '专业',
          '班级',
          '市场部',
          '当前成绩',
          '还差成绩',
          '挂科次数'
        ]
        const filterVal = [
          'studentID',
          'name',
          'sex',
          'age',
          'study',
          'major',
          'classes',
          'citycenter',
          'chengji',
          'graduation',
          'failss'
        ]
        const data = this.formatJson(filterVal, this.data)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    }
  }
}
</script>
