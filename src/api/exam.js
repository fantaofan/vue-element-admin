import Axios from 'axios'

export const getAllStudents = (page, pageSize) => {
  return Axios.post('http://132.232.89.22:8080/allstudentPage', {
    page,
    pageSize
  })
}

export const excel = excarr => {
  console.log(excarr)
  return Axios.post('http://132.232.89.22:8080/inExcel', { excarr })
}
