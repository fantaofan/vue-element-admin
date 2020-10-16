const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/school", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
module.exports = option => {
  return mongoose.Schema(option);
};
