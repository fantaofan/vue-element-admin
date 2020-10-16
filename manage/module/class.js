const mongoose = require("mongoose");
const Mongo = require("./mongodb");

const Class = Mongo({
  classname: {
    type: String,
    required: true
  },
  createDate: Date,
  teacher: String,
  headmaster: String
});
const classModel = mongoose.model("class", Class);

// 创建班级
exports.createClass = (item, callback) => {
  classModel.insertMany([item]).then(docs => {
    if (docs.length == 0) {
      result = {
        code: -1,
        msg: "创建失败"
      };
    } else {
      result = {
        code: 0,
        msg: "创建成功"
      };
    }
    callback(result);
  });
};

// 获取班级列表
exports.getAllClass = callback => {
  classModel.find().then(docs => {
    if (docs.length == 0) {
      result = {
        code: -1,
        msg: "没有取到任何班级信息",
        data: []
      };
    } else {
      const data = [];
      for (let i = 0; i < docs.length; i++) {
        docs[i]._doc.createDate = new Date(docs[i]._doc.createDate)
          .toLocaleString()
          .split(" ")[0];
        data.push(docs[i]._doc);
      }
      result = {
        code: 0,
        msg: "成功取到" + docs.length + "条班级信息",
        data
      };
    }
    callback(result);
  });
};

// 删除班级
exports.deleteClass = (id, callback) => {
  classModel.deleteOne({ _id: id._id }).then(docs => {
    if (docs.n == 1) {
      result = {
        code: 0,
        msg: "删除成功"
      };
    } else {
      result = {
        code: -1,
        msg: "删除失败"
      };
    }
    callback(result);
  });
};

// 通过id获取班级信息
exports.getClassById = (id, callback) => {
  classModel.find({ _id: id._id }).then(doc => {
    if (doc.length == 0) callback(false);
    else callback(doc[0]._doc);
  });
};

// 更新班级信息
exports.updateClassById = (id, data, callback) => {
  classModel.updateOne({ _id: id }, { $set: data }).then(doc => {
    if (doc.ok == 1) {
      result = {
        code: 0,
        msg: "更新成功"
      };
    } else {
      result = {
        code: -1,
        msg: "更新失败"
      };
    }
    callback(result);
  });
};
