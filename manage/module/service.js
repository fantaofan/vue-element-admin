const student = require("./student");
const headmaster = require("./headmaster");
const classmethod = require("./class");
const login = require("./login.js");
const userinfo = require("./userinfo.js");
// npm i jsonwebtoken
const jwt = require("jsonwebtoken");

// 创建用户
exports.createUserHandle = (req, res) => {
  let body = req.body;
  login.addUser(body, result => {
    if (result.length != 0) {
      let userinfodata = {
        usernameid: result[0].username + result[0]._id,
        username: result[0].username,
        level: body.level == "普通用户" ? 1 : 2,
        roles: body.level == "普通用户" ? "1 " : "2"
      };
      userinfo.addUserInfo(userinfodata, result => {
        res.json({
          code: 0,
          msg: "创建成功"
        });
      });
    }
  });
};

// 登录
exports.userLoginHandle = (req, res) => {
  let body = req.body;
  // console.log(body); // { username: 'ftf', password: '123456' }
  login.getUser(body, result => {
    // console.log(result); // 返回logins表的数据
    if (result.length != 0) {
      res.json({
        // code码需要与mock/user.js里的code码对应
        code: 20000,
        data: {
          token: jwt.sign(
            {
              username: result[0].username,
              id: result[0]._id
            },
            "abcd",
            {
              expiresIn: "1h"
            }
          )
        }
      });
    } else {
      res.json({
        code: 60204,
        message: "密码或者用户名不存在"
      });
    }
  });
};

// 获取用户信息
exports.userInfoHandle = (req, res) => {
  // console.log(req.query.token); // 一串token
  jwt.verify(req.query.token, "abcd", function(err, decode) {
    // console.log(decode); // 解密成功的数据
    if (err) {
      res.json({
        code: 5005,
        data: "success",
        message: "用户未登录"
      });
    } else {
      let usernameid = decode.username + decode.id;
      userinfo.Getinfo({ usernameid }, result => {
        // console.log(result); // informations表的数据
        if (result.length != 0) {
          res.json({
            code: 20000,
            data: {
              level: result[0].level,
              roles: [result[0].roles],
              introduction: `I am a ${result[0].username}`,
              // avatar: result[0].portrait,
              name: `${result[0].username}`,
              token: jwt.sign(
                {
                  username: result[0].usernameid
                },
                "abcd",
                { expiresIn: "1h" }
              )
            }
          });
        } else {
          res.json({
            code: 50008,
            message: "登录失败"
          });
        }
      });
    }
  });
};

// 退出登录
exports.userLoginOutHandle = (req, res) => {
  res.json({
    code: 20000,
    data: "success"
  });
};

// 添加学生
exports.addStudentHandle = (req, res) => {
  const body = req.body;
  student.addStudent(body, result => {
    const { msg, _id } = result;
    res.json({
      msg,
      _id,
      code: result.code
    });
  });
};

// 获取学生列表
exports.getAllStudentsHandle = (req, res) => {
  student.getAllStudents(result => {
    const { msg, data } = result;
    res.json({
      msg,
      data,
      code: result.code
    });
  });
};

// 删除学生
exports.deleteStudentHandle = (req, res) => {
  student.deletestudent(req.body, result => {
    res.json({
      msg: result.msg,
      code: result.code
    });
  });
};

// 通过id获取学生信息
exports.getStudentByIdHandle = (req, res) => {
  student.getStudentById(req.body, result => {
    res.json({
      data: result
    });
  });
};

// 更新学生信息
exports.updateStudentHandle = (req, res) => {
  const id = req.body._id;
  student.updateStudentById(id, req.body, result => {
    res.json({
      code: result.code,
      msg: result.msg
    });
  });
};

// 查找学生
exports.findStudentHandle = (req, res) => {
  student.findStudent(req.body, result => {
    const { msg, data } = result;
    res.json({
      msg,
      data,
      code: result.code
    });
  });
};

// 添加班主任
exports.addHeadMasterHandle = (req, res) => {
  headmaster.addHeadMaster(req.body, result => {
    res.json({
      msg: result.msg,
      code: result.code
    });
  });
};

// 获取班主任列表
exports.getallheadmastersHandle = (req, res) => {
  headmaster.getAllHeadMasters(result => {
    const { msg, data } = result;
    res.json({
      msg,
      data,
      code: result.code
    });
  });
};

// 删除班主任
exports.deleteheadmasterHandle = (req, res) => {
  headmaster.deleteheadmaster(req.body, result => {
    res.json({
      msg: result.msg,
      code: result.code
    });
  });
};

// 创建班级
exports.createClassHandle = (req, res) => {
  classmethod.createClass(req.body, result => {
    res.json({
      msg: result.msg,
      code: result.code
    });
  });
};

// 获取班级列表
exports.getAllClassHandle = (req, res) => {
  classmethod.getAllClass(result => {
    const { msg, data, code } = result;
    res.json({
      msg,
      data,
      code
    });
  });
};

// 删除班级
exports.deleteClassHandle = (req, res) => {
  classmethod.deleteClass(req.body, result => {
    res.json({
      msg: result.msg,
      code: result.code
    });
  });
};

// 通过id获取班级信息
exports.getClassByIdHandle = (req, res) => {
  classmethod.getClassById(req.body, result => {
    res.json({
      data: result
    });
  });
};

// 更新班级信息
exports.updateClassHandle = (req, res) => {
  const id = req.body._id;
  classmethod.updateClassById(id, req.body, result => {
    res.json({
      code: result.code,
      msg: result.msg
    });
  });
};
