import Axios from 'axios'

const url = 'http://localhost:5000'

// 创建用户
export const createUser = data => {
  return Axios.post(url + '/createuser', { ...data })
}

// 获取学生列表
export const getAllStudents = () => {
  return Axios.post(url + '/getallstudents')
}

// 添加学生
export const addStudent = studentitem => {
  return Axios.post(url + '/addstudent', { ...studentitem })
}

// 删除学生
export const deleteStudent = _id => {
  return Axios.post(url + '/deletestudent', { _id })
}

// 通过id获取学生信息
export const getStudentById = _id => {
  return Axios.post(url + '/getstudentbyid', { _id })
}

// 更新学生信息
export const updateStudent = (_id, newdata) => {
  return Axios.post(url + '/updatestudent', { _id, ...newdata })
}

// 查找学生信息
export const findStudent = condition => {
  return Axios.post(url + '/findstudent', { ...condition })
}

// 获取班主任列表
export const getAllHeadMasters = () => {
  return Axios.post(url + '/getallheadmasters')
}

// 添加班主任
export const addHeadMaster = headmasteritem => {
  return Axios.post(url + '/addheadmaster', {
    ...headmasteritem
  })
}

// 删除班主任
export const deleteHeadMaster = _id => {
  return Axios.post(url + '/deleteheadmaster', { _id })
}

// 添加班级
export const createClass = classitem => {
  return Axios.post(url + '/createclass', { ...classitem })
}

// 获取班级列表
export const getAllClassList = () => {
  return Axios.post(url + '/getallclass')
}

// 删除班级
export const deleteClass = _id => {
  return Axios.post(url + '/deleteclass', { _id })
}

// 通过id获取班级信息
export const getClassById = _id => {
  return Axios.post(url + '/getclassbyid', { _id })
}

// 更新班级信息
export const updateClass = (_id, newdata) => {
  return Axios.post(url + '/updateclass', { _id, ...newdata })
}
