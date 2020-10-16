const mongoose = require('mongoose')
const Mongo = require('./mongodb')

const Headmaster = Mongo({
  name: {
    type: String,
    required: true
  },
  sex: String,
  college: String,
  entryDate: Date
})
const headmasterModel = mongoose.model('headmaster', Headmaster)

// 添加班主任
exports.addHeadMaster = (item, callback) => {
  headmasterModel.insertMany([item]).then(docs => {
    if (docs.length == 0) {
      result = {
        code: -1,
        msg: '添加失败'
      }
    } else {
      result = {
        code: 0,
        msg: '添加成功'
      }
    }
    callback(result)
  })
}

// 获取班主任列表
exports.getAllHeadMasters = callback => {
  headmasterModel.find().then(docs => {
    if (docs.length == 0) {
      result = {
        code: -1,
        msg: '没有取到任何班主任信息',
        data: []
      }
    } else {
      const data = []
      for (let i = 0; i < docs.length; i++) {
        docs[i]._doc.entryDate = new Date(docs[i]._doc.entryDate)
          .toLocaleString()
          .split(' ')[0]
        data.push(docs[i]._doc)
      }
      result = {
        code: 0,
        msg: '成功取到' + docs.length + '条班主任信息',
        data
      }
    }
    callback(result)
  })
}

// 删除班主任
exports.deleteheadmaster = (id, callback) => {
  headmasterModel.deleteOne({ _id: id._id }).then(docs => {
    if (docs.n == 1) {
      result = {
        code: 0,
        msg: '删除成功'
      }
    } else {
      result = {
        code: -1,
        msg: '删除失败'
      }
    }
    callback(result)
  })
}
