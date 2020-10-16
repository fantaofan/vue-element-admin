<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 150%"
    >
      <el-table-column
        align="center"
        label="姓名"
        prop="name"
      />
      <el-table-column
        align="center"
        label="性别"
        prop="sex"
      />
      <el-table-column
        align="center"
        label="学院"
        prop="college"
      />
      <el-table-column
        align="center"
        label="入职日期"
        prop="entryDate"
      />
      <el-table-column
        v-if="level>=2"
        align="center"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            style="margin-top:3px;"
            @click="handleDelete(scope.row._id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getAllHeadMasters, deleteHeadMaster } from '@/api/index'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.getallheadmasters()
  },
  computed: {
    ...mapGetters(['level'])
  },
  methods: {
    async getallheadmasters() {
      const { data, status } = await getAllHeadMasters()
      if (status == 200) {
        // alert(data.msg);
        this.tableData = [...this.tableData, ...data.data]
      } else {
        alert(data.msg)
      }
    },
    handleDelete(id) {
      this.$confirm('此操作将永久删除该项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async res => {
          const { data } = await deleteHeadMaster(id)
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
    }
  }
}
</script>
