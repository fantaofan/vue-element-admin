// 路由模块
const express = require("express");
const service = require("./service");
const router = express.Router();
const fs = require("fs");
router
  .get("/", (res, req) => {
    req.writeHead(200, { "Content-Type": "text/html" });
    fs.readFile("index.html", "utf-8", function(err, data) {
      if (err) {
        throw err;
      }
      req.end(data);
    });
  })
  // 用户操作
  .post("/user/login", service.userLoginHandle)
  .get("/user/info", service.userInfoHandle)
  .post("/user/logout", service.userLoginOutHandle)
  // 创建用户
  .post("/createuser", service.createUserHandle)

  // 学生操作
  .post("/addstudent", service.addStudentHandle)
  .post("/getallstudents", service.getAllStudentsHandle)
  .post("/deletestudent", service.deleteStudentHandle)
  .post("/getstudentbyid", service.getStudentByIdHandle)
  .post("/updatestudent", service.updateStudentHandle)
  .post("/findstudent", service.findStudentHandle)

  // 班主任操作
  .post("/addheadmaster", service.addHeadMasterHandle)
  .post("/getallheadmasters", service.getallheadmastersHandle)
  .post("/deleteheadmaster", service.deleteheadmasterHandle)

  // 班级操作
  .post("/createclass", service.createClassHandle)
  .post("/getallclass", service.getAllClassHandle)
  .post("/deleteclass", service.deleteClassHandle)
  .post("/getclassbyid", service.getClassByIdHandle)
  .post("/updateclass", service.updateClassHandle);

module.exports = router;
