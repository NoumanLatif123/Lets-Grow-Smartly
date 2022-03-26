const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const CryptoJS = require("crypto-js");
const multer = require("multer");
var uuid = require("uuid");
var path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets/images");
  },
  filename: function (req, file, cb) {
    cb(null, uuid.v4() + path.extname(file.originalname)); //Appending extension
  },
});
const upload = multer({ storage: storage });
const JWT_SECRET = "Umair is best";
var checkNull = true;
// Route 1: Create a user using: POST "/api/auth/createuser", No login required
router.post("/createuser", [upload.single("picture")], async (req, res) => {
  let success = false;

  // If there are errors, return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }
  // Check Weather the user with this email exits already

  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ success, error: "Sorry a user with email already exits" });
    }

    var bytes = CryptoJS.AES.decrypt(req.body.pass, "this is very secret");
    var password = bytes.toString(CryptoJS.enc.Utf8);
    const salt = await bcrypt.genSaltSync(10);
    const secPass = await bcrypt.hash(password, salt);
    let picture = req.file == null ? "" : req.file.filename;

    //Create a new User
    const approval = req.body.usertype === "2" ? "pending" : "accepted";

    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
      qualification: req.body.qualification,
      usertype: req.body.usertype,
      certificateImg: req.body.certificateImg,
      picture: picture,
      approvalStatus: approval,
    });

    const data = {
      user: {
        id: user.id,
      },
    };
    const authtoken = jwt.sign(data, JWT_SECRET);

    //res.json(user)
    success = true;
    res.json({ success, authtoken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Enternal Server Error");
  }
});

// Route 2: Authenticate a user using: POST "/api/auth/login", No login required
router.post(
  "/login",
  [
    body("email", "Enter Valid Email").isEmail(),
    body("password", "Password cant be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    // If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct information" });
      }

      //decrypt here

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res.status(400).json({
          success,
          error: "Please try to login with correct information",
        });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      const userData = {
        id: user.id,
        name: user.name,
        qualification: user.qualification,
        userRole: user.usertype,
      };
      success = true;
      res.json({ success, authtoken, userData });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Enternal Server Error");
    }
  }
);

// Route 3: Get logged in users detail using: POST "/api/auth/getuser", login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Enternal Server Error");
  }
});

/**
 *  @desc Update Login User
 *
 *  @param name
 *  @param qualification
 *  @param password
 */
router.post("/update", fetchuser, async (req, res) => {
  try {
    const { name, password, old_password } = req.body;
    const userId = req.user.id;

    //console.log("old password", old_password);
    if (old_password) {
      let oldPasswordBytes = CryptoJS.AES.decrypt(
        old_password,
        "this is very secret"
      );
      let oldPassword = oldPasswordBytes.toString(CryptoJS.enc.Utf8);
      let user = await User.findOne({ _id: userId });
      //console.log(user);
      const passwordCompare = await bcrypt.compare(oldPassword, user.password);
      //console.log("password compare>>>>", passwordCompare);
      if (!passwordCompare) {
        return res.status(500).send("wrong information sent");
      }
    }

    const updatedData = { name };

    if (password) {
      let bytes = CryptoJS.AES.decrypt(password, "this is very secret");
      let pass = bytes.toString(CryptoJS.enc.Utf8);
      const salt = await bcrypt.genSaltSync(10);
      updatedData.password = await bcrypt.hash(pass, salt);
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: updatedData },
      {
        new: true,
        upsert: true,
      }
    );
    //console.log("updation true");
    const userData = {
      name: updatedUser.name,
      qualification: updatedUser.qualification,
      userRole: updatedUser.usertype,
    };
    res.status(200).json({
      success: true,
      userData,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
