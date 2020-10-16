<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 150%"
    >
      <el-table-column
        align="center"
        label="名称"
        prop="classname"
        sortable
      />
      <el-table-column
        align="center"
        label="创建时间"
        prop="createDate"
        sortable
      />
      <el-table-column
        align="center"
        label="讲师"
        prop="teacher"
        sortable
      />
      <el-table-column
        align="center"
        label="班主任"
        prop="headmaster"
        sortable
      />
      <el-table-column
        v-if="level>=2"
        align="center"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="handleUpdate(scope.row._id)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            style="margin-top:3px;"
            @click="handleDelete(scope.row._id)"
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
        <el-form-item label="讲师">
          <el-input v-model="form.teacher" />
        </el-form-item>
        <el-form-item label="班主任">
          <el-input v-model="form.headmaster" />
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
  </div>
</template>
<script>
import {
  getAllClassList,
  deleteClass,
  getClassById,
  updateClass
} from '@/api/index'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      form: {
        teacher: '',
        headmaster: ''
      },
      classId: ''
    }
  },
  created() {
    this.getAllClass()
  },
  computed: {
    ...mapGetters(['level'])
  },
  methods: {
    async getAllClass() {
      const { data } = await getAllClassList()
      if (data.code == 0) {
        // alert(data.msg);
        this.tableData = data.data
      }
    },
    handleDelete(id) {
      this.$confirm('此操作将永久删除该项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async res => {
          const { data } = await deleteClass(id)
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
      this.classId = id
      const { data } = await getClassById(id)
      console.log(data)
      this.form = data.data
    },
    async updateData() {
      const { data } = await updateClass(this.classId, this.form)
      this.dialogFormVisible = false
      alert(data.msg)
      this.getAllClass()
    }
  }
}
</script>
