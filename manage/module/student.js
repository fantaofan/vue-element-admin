const mongoose = require("mongoose");
const Mongo = require("./mongodb");

const Student = Mongo({
  name: {
    type: String,
    required: true
  },
  sex: String,
  age: String,
  classtype: String,
  master: String,
  market: String,
  result: Number,
  count: Number,
  classname: String
});
const stuModel = mongoose.model("Stu", Student);

// 添加学生
exports.addStudent = (item, callback) => {
  stuModel.insertMany([item]).then(docs => {
    if (docs.length == 0) {
      result = {
        code: -1,
        msg: "添加失败"
      };
    } else {
      result = {
        code: 0,
        msg: "添加成功"
      };
    }
    callback(result);
  });
};

// 获取所有学生
exports.getAllStudents = callback => {
  stuModel.find().then(docs => {
    if (docs.length == 0) {
      result = {
        code: -1,
        msg: "没有取到任何学生信息",
        data: []
      };
    } else {
      const data = [];
      for (let i = 0; i < docs.length; i++) {
        data.push(docs[i]._doc);
      }
      result = {
        code: 0,
        msg: "成功取到" + docs.length + "条学生记录信息",
        data
      };
    }
    callback(result);
  });
};

// 删除学生
exports.deletestudent = (id, callback) => {
  stuModel.deleteOne({ _id: id._id }).then(docs => {
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

// 通过id获取学生信息
exports.getStudentById = (id, callback) => {
  stuModel.find({ _id: id._id }).then(doc => {
    if (doc.length == 0) callback(false);
    else callback(doc[0]._doc);
  });
};

// 更新学生信息
exports.updateStudentById = (id, data, callback) => {
  stuModel.updateOne({ _id: id }, { $set: data }).then(doc => {
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

// 查找学生信息
exports.findStudent = (condition, callback) => {
  for (let key in condition) {
    switch (key) {
      case "name":
        condition[key] = JSON.parse(JSON.stringify({ $regex: condition[key] }));
        continue;
      case "result":
        if (!condition[key].search("<=")) {
          let num = Number(condition[key].slice(2));
          condition[key] = JSON.parse(JSON.stringify({ $lte: num }));
        } else if (!condition[key].search("<")) {
          let num = Number(condition[key].slice(1));
          condition[key] = JSON.parse(JSON.stringify({ $lt: num }));
        } else if (!condition[key].search(">=")) {
          let num = Number(condition[key].slice(2));
          condition[key] = JSON.parse(JSON.stringify({ $gte: num }));
        } else if (!condition[key].search(">")) {
          let num = Number(condition[key].slice(1));
          condition[key] = JSON.parse(JSON.stringify({ $gt: num }));
        }
      default:
        break;
    }
  }
  stuModel.find(condition).then(docs => {
    if (docs.length == 0) {
      result = {
        code: -1,
        msg: "没有取到任何学生信息",
        data: []
      };
    } else {
      const data = [];
      for (let i = 0; i < docs.length; i++) {
        data.push(docs[i]._doc);
      }
      result = {
        code: 0,
        msg: "成功取到" + docs.length + "条学生记录信息",
        data
      };
    }
    callback(result);
  });
};
