const router = require("express").Router();
const Notification = require("../models/Notification");

//add

router.post("/", async (req, res) => {
  const newNotification = new Notification(req.body);
  //console.log(req.body);
  try {
    const savedNotification = await newNotification.save();
    res.status(200).json(savedNotification);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get
router.get("/forAdmins", async (req, res) => {
  try {
    const notifications = await Notification.find({
      forAdmins: true,
    });
    console.log(notifications);
    res.status(200).json(notifications);
    //console.log('notifications>>> ',notifications)
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/:receiverId", async (req, res) => {
  try {
    const notifications = await Notification.find({
      receiverId: req.params.receiverId,
    });
    res.status(200).json(notifications);
    //console.log('notifications>>> ',notifications)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/deleteAll", (req, res) => {
  try {
    Notification.deleteMany({}).then(function (result) {
      // process result
    });
  } catch (err) {
    console.log(err);
  }
});
//update status of appointment by appointment id
router.put("/update", async (req, res) => {
  try {
    const filter = { _id: req.body.notificationId };
    const option = { $set: { read: req.body.read } };
    const notification = await Notification.findOneAndUpdate(filter, option);
    return res.status(200).json(notification);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
