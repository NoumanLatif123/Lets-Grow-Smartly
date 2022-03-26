const mongoose = require("mongoose");

const mongoURI =
  "mongodb://test:test@cluster0-shard-00-00.ohh8x.mongodb.net:27017,cluster0-shard-00-01.ohh8x.mongodb.net:27017,cluster0-shard-00-02.ohh8x.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-qhsj6t-shard-0&authSource=admin&retryWrites=true&w=majority";

const connectToMongo = () => {
  //mongoose.connect(mongoURI).catch((error) => console.log(error));
  mongoose.connect(mongoURI, () => {
    console.log("connected to mongoDB");
  });
  mongoose.set("useNewUrlParser", true);
  mongoose.set("useFindAndModify", false);
  mongoose.set("useCreateIndex", true);
};

module.exports = connectToMongo;
