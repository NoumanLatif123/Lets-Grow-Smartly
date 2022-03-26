const express = require("express");
const User = require("../models/User");
const router = express.Router();
//constants
const { UserType } = require("../constants");

/**
 *  @desc Get all users
 */
router.get("/", async (req, res) => {
  try {
    //console.log("User>>>> ", User.find({}).select("-password"));
    const user = await User.find().select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

/**
 *  @desc Get all specialists
 */
router.get("/specialists", async (req, res) => {
  try {
    const users = await User.find({ usertype: "2" });

    res.status(200).json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

/**
 *  @desc Get all patients
 */
router.get("/patients", async (req, res) => {
  console.log("running patients...");
  try {
    const users = await User.find()
      .where("usertype")
      .equals(UserType.PATIENT)
      .select("-password");

    res.send(JSON.stringify(users));
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/getUserBy", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    //console.log("user id = ", userId);
    //console.log("user name = ", username);
    //console.log("User>>> ", User);
    const users = userId
      ? await User.find({ _id: userId })
      : await User.findOne({ name: username });
    // const { password, updatedAt, ...other } = user._doc;
    //console.log("user>>>> ", users);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send(err);
  }
});
//get top rated doctors
router.get("/top-rated-doctors", async (req, res) => {
  try {
    const doctors = await User.find({ usertype: "2" });
    const filteredDoctors = doctors.filter(
      (doctor) => doctor.rating !== "no rating"
    );
    let sortedDoctors = filteredDoctors.sort(
      (f, s) => parseFloat(s.rating) - parseFloat(f.rating)
    );
    if (sortedDoctors.length > 5) {
      sortedDoctors = sortedDoctors.slice(0, 5);
    }
    res.status(200).json(sortedDoctors);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

/**
 *  @desc Search specialists by name
 *
 *  @param search_text
 */
router.post("/searchSpecialistByName", async (req, res) => {
  try {
    const searchText = req.body.search_text ?? "";
    const user = await User.find({ name: { $regex: searchText } })
      .where("usertype")
      .equals(UserType.SPECIALIST)
      .select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
router.put("/updateProfileImage", async (req, res) => {
  try {
    const requiredUserId = req.body.userId ?? "";
    const requiredUserImageUrl = req.body.imgUrl ?? "";
    //console.log(requiredUserId, requiredUserImageUrl);
    const user =
      requiredUserImageUrl &&
      (await User.updateOne(
        { _id: requiredUserId },
        { $set: { picture: requiredUserImageUrl } }
      ));
    // console.log(user);
    res.status(200).json(user);
  } catch (err) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
router.put("/updateUsername", async (req, res) => {
  try {
    const requiredUserId = req.body.userId ?? "";
    const requiredUsername = req.body.username ?? "";
    console.log(requiredUserId, requiredUsername);
    const user =
      requiredUsername &&
      (await User.updateOne(
        { _id: requiredUserId },
        { $set: { name: requiredUsername } }
      ));
    // console.log(user);

    res.status(200).json(user);
  } catch (err) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
router.put("/updateApprovalStatus", async (req, res) => {
  try {
    const requiredUserId = req.body.userId ?? "";
    const requiredApprovalStatus = req.body.approvalStatus ?? "";
    //console.log(requiredUserId, requiredUserImageUrl);
    const user =
      requiredApprovalStatus &&
      (await User.updateOne(
        { _id: requiredUserId },
        { $set: { approvalStatus: requiredApprovalStatus } }
      ));
    // console.log(user);

    res.status(200).json(user);
  } catch (err) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
router.put("/updateRating", async (req, res) => {
  try {
    const requiredUserId = req.body.userId ?? "";
    const requiredUserRating = req.body.rating ?? "";
    //console.log(requiredUserId, requiredUserImageUrl);
    const user =
      requiredUserRating &&
      (await User.updateOne(
        { _id: requiredUserId },
        { $set: { rating: requiredUserRating } }
      ));
    // console.log(user);
    res.status(200).json(user);
  } catch (err) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/deleteAll", (req, res) => {
  try {
    User.deleteMany({}).then(function (result) {
      // process result
    });
  } catch (err) {
    console.log(err);
  }
});
router.delete("/deleteUser/:userId", (req, res) => {
  try {
    User.deleteOne({ _id: req.params.userId }).then(function (result) {
      // process result
    });
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
