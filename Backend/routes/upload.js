const router = require("express").Router();
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");
const cors = require("cors");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const crypto = require("crypto");

//Connect to DB
const mongoURI =
  "mongodb://test:test@cluster0-shard-00-00.ohh8x.mongodb.net:27017,cluster0-shard-00-01.ohh8x.mongodb.net:27017,cluster0-shard-00-02.ohh8x.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-qhsj6t-shard-0&authSource=admin&retryWrites=true&w=majority";

const conn = mongoose.createConnection(mongoURI);

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

let gfs;

conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
  console.log("Connection Successful");
});

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });

router.post("/", upload.single("img"), (req, res, err) => {
  res.send(req.files);
});

router.get("/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists",
      });
    }

    // Check if image
    if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: "Not an image",
      });
    }
  });
});

module.exports = router;
