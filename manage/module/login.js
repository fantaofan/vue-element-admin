const mongoose = require("mongoose");
const Mongo = require("./mongodb");

const Login = Mongo({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});
const loginModel = mongoose.model("login", Login);

exports.getUser = (data, callback) => {
  loginModel.find(data).then(doc => {
    callback(doc);
  });
};

exports.addUser = (data, callback) => {
  loginModel.insertMany([data]).then(doc => {
    callback(doc);
  });
};
