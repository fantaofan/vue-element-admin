<template>
  <div>
    <!-- 查询模块 -->
    <div
      v-show="searchShow===1"
      class="searchbox-bs-002"
    >
      <li>可选项</li>
      <li>
        <el-input
          v-model="search.name"
          size="mini"
          placeholder="姓名"
        />
      </li>
      <li>
        <el-input
          v-model="search.age"
          size="mini"
          placeholder="年龄"
        />
      </li>
      <li>
        <el-select
          v-model="search.sex"
          size="mini"
          placeholder="性别"
        >
          <el-option
            label="男"
            value="男"
          />
          <el-option
            label="女"
            value="女"
          />
        </el-select>
      </li>
      <li>
        <el-select
          v-model="search.classtype"
          size="mini"
          placeholder="学制"
        >
          <el-option
            label="一年"
            value="一年"
          />
          <el-option
            label="两年"
            value="两年"
          />
          <el-option
            label="三年"
            value="三年"
          />
        </el-select>
      </li>
      <li>
        <el-select
          v-model="search.master"
          size="mini"
          placeholder="专业"
        >
          <el-option
            label="web架构"
            value="web架构"
          />
          <el-option
            label="视觉设计"
            value="视觉设计"
          />
        </el-select>
      </li>
      <li>
        <el-select
          v-model="search.classname"
          size="mini"
          placeholder="班级"
        >
          <el-option
            label="1807A"
            value="1807A"
          />
          <el-option
            label="1810A"
            value="1810A"
          />
          <el-option
            label="1902B"
            value="1902B"
          />
          <el-option
            label="1905A"
            value="1905A"
          />
        </el-select>
      </li>
      <li>
        <el-select
          v-model="search.market"
          size="mini"
          placeholder="市场部"
        >
          <el-option
            label="冀中市场部"
            value="冀中市场部"
          />
          <el-option
            label="豫皖市场部"
            value="豫皖市场部"
          />
          <el-option
            label="邢台市场部"
            value="邢台市场部"
          />
          <el-option
            label="淮南市场部"
            value="淮南市场部"
          />
        </el-select>
      </li>
      <li>
        <el-input
          v-model="search.result"
          size="mini"
          placeholder="成绩/门"
        />
      </li>
      <li>
        <el-select
          v-model="search.count"
          size="mini"
          placeholder="挂科次数"
        >
          <el-option
            label="0次"
            value="0"
          />
          <el-option
            label="1次"
            value="1"
          />
          <el-option
            label="2次"
            value="2"
          />
          <el-option
            label="3次及以上"
            value="3"
          />
        </el-select>
      </li>
      <li style="display:flex;">
        <el-button
          size="small"
          type="success"
          @click="submitSearch"
        >确定</el-button>
        <el-button
          size="small"
          type="info"
          @click="clearSearch"
        >清空</el-button>
      </li>
    </div>
    <!-- 表格 -->
    <el-table
      :data="tableData"
      style="width: 100%"
    >
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
        prop="classtype"
        label="学制"
        sortable
      />
      <el-table-column
        prop="master"
        label="专业"
        sortable
      />
      <el-table-column
        prop="classname"
        label="班级"
        sortable
      />
      <el-table-column
        prop="market"
        label="市场部"
        sortable
      />
      <el-table-column
        prop="result"
        label="成绩/门"
        sortable
      />
      <el-table-column
        prop="count"
        label="挂科次数/次"
        width="120"
        sortable
      />
      <el-table-column v-if="level>=2">
        <template slot="header">操作</template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            style="margin-top:3px;"
            @click="handleUpdate(scope.row._id)"
          >修改</el-button>
        </template>
      </el-table-column>
      <el-table-column>
        <template
          slot="header"
          slot-scope="scope"
        >
          <el-button
            v-if="searchShow===1"
            type="primary"
            size="small"
            @click="cancelSearch"
          >取消</el-button>
          <el-button
            v-else
            type="success"
            size="small"
            @click="searchshow"
          >查询</el-button>
        </template>
        <template
          v-if="level>=2"
          slot-scope="scope"
        >
          <el-button
            size="mini"
            type="danger"
            style="margin-top:3px;"
            @click="deleteitem(scope.row._id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑弹框 -->
    <el-dialog :visible.sync="dialogFormVisible">
      <el-form
        :model="form"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
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
              label="一年"
              value="一年"
            />
            <el-option
              label="两年"
              value="两年"
            />
            <el-option
              label="三年"
              value="三年"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="专业">
          <el-select
            v-model="form.master"
            placeholder="请选择专业"
          >
            <el-option
              label="web架构"
              value="web架构"
            />
            <el-option
              label="视觉设计"
              value="视觉设计"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="班级">
          <el-select
            v-model="form.classname"
            placeholder="请选择班级"
          >
            <el-option
              label="1807A"
              value="1807A"
            />
            <el-option
              label="1810A"
              value="1810A"
            />
            <el-option
              label="1902B"
              value="1902B"
            />
            <el-option
              label="1905A"
              value="1905A"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="市场部">
          <el-select
            v-model="form.market"
            placeholder="请选择市场部"
          >
            <el-option
              label="冀中市场部"
              value="冀中市场部"
            />
            <el-option
              label="豫皖市场部"
              value="豫皖市场部"
            />
            <el-option
              label="邢台市场部"
              value="邢台市场部"
            />
            <el-option
              label="淮南市场部"
              value="淮南市场部"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="已有成绩">
          <el-input v-model="form.result" />
        </el-form-item>
        <el-form-item label="挂科次数">
          <el-input v-model="form.count" />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button
          type="primary"
          @click="updateData"
        >
          确定
        </el-button>
      </div>
    </el-dialog>
    <el-button
      style="margin:0 0 20px 20px;"
      type="primary"
      icon="el-icon-document"
      @click="handleDownload"
    >
      Export Excel
    </el-button>
    <el-button
      style="margin-left:16px;"
      size="mini"
      type="primary"
      @click="handleUpload"
    >
      Browse
    </el-button>
  </div>
</template>

<script>
import {
  getAllStudents,
  deleteStudent,
  getStudentById,
  updateStudent,
  findStudent
} from '@/api/index'
import { mapGetters } from 'vuex'
import { parseTime } from '@/utils'

export default {
  data() {
    return {
      tableData: [],
      studentId: '',
      // 编辑
      dialogFormVisible: false,
      form: {
        name: '',
        sex: '',
        age: '',
        classtype: '',
        master: '',
        classname: '',
        market: '',
        result: '',
        count: ''
      },
      // 搜索模块
      searchShow: 2,
      search: {
        name: '',
        sex: '',
        age: '',
        classtype: '',
        master: '',
        classname: '',
        market: '',
        result: '',
        count: ''
      },
      // 表格
      downloadLoading: false,
      filename: '',
      autoWidth: true,
      bookType: 'xlsx'
    }
  },
  created() {
    this.getallstudents()
  },
  computed: {
    ...mapGetters(['level'])
  },
  methods: {
    async getallstudents() {
      const { data, status } = await getAllStudents()
      if (status == 200) {
        this.tableData = data.data
      } else {
        alert('网络错误，请稍后再试')
      }
    },
    async deleteitem(id) {
      this.$confirm('此操作将永久删除该项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async res => {
          const { data } = await deleteStudent(id)
          if (data.code == 0) {
            this.tableData = this.tableData.filter(item => item._id != id)
            return this.$message.success(data.msg)
          }
          this.$message({
            type: 'error',
            message: data.msg
          })
        })
        .catch(err => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    async handleUpdate(id) {
      this.dialogFormVisible = true
      this.studentId = id
      const { data } = await getStudentById(id)
      this.form = data.data
    },
    async updateData() {
      const { data } = await updateStudent(this.studentId, this.form)
      this.dialogFormVisible = false
      alert(data.msg)
      this.getallstudents()
    },
    // 搜索模块显示
    searchshow() {
      this.searchShow = 1
    },
    // 取消搜索
    cancelSearch() {
      this.searchShow = 2
    },
    // 清空搜索框
    clearSearch() {
      this.search.name = ''
      this.search.sex = ''
      this.search.age = ''
      this.search.classtype = ''
      this.search.master = ''
      this.search.classname = ''
      this.search.market = ''
      this.search.result = ''
      this.search.count = ''
    },
    // 确定搜索
    async submitSearch() {
      const newobj = {}
      for (const key in this.search) {
        if (this.search[key] != '') {
          newobj[key] = this.search[key]
        }
      }
      if (JSON.stringify(newobj) == '{}') return
      const { data } = await findStudent(newobj)
      this.tableData = data.data
      alert(data.msg)
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = [
          '姓名',
          '性别',
          '年龄',
          '学制',
          '专业',
          '班级',
          '市场部',
          '已有成绩',
          '挂科次数'
        ]
        const filterVal = [
          'name',
          'sex',
          'age',
          'classtype',
          'master',
          'classname',
          'market',
          'result',
          'count'
        ]
        const data = this.formatJson(filterVal, this.tableData)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
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
    },
    handleUpload() {
      this.$refs['excel-upload-input'].click()
    }
  }
}
</script>
<style scoped>
.searchbox-bs-002 {
  width: 100%;
  display: flex;
  align-items: center;
}
.searchbox-bs-002 > li {
  width: 10%;
  margin-left: 10px;
  margin-top: 15px;
  margin-bottom: 15px;
  list-style: none;
}
</style>
