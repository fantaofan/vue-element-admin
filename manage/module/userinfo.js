var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

exports.Getinfo = (data, callback) => {
  MongoClient.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    function(err, db) {
      if (err) throw err;
      var dbo = db.db("school");
      dbo
        .collection("informations")
        .find(data)
        .toArray(function(err, result) {
          // 返回集合中所有数据
          if (err) throw err;
          callback(result);
          db.close();
        });
    }
  );
};

exports.addUserInfo = (data, callback) => {
  MongoClient.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    function(err, db) {
      if (err) throw err;
      var dbo = db.db("school");
      dbo.collection("informations").insertOne(data, function(err, res) {
        if (err) throw err;
        callback(res);
        db.close();
      });
    }
  );
};
