const router = require("express").Router();
const Review = require("../models/Review");

//add

router.post("/", async (req, res) => {
  const newReview = new Review(req.body);
  //console.log(req.body);
  try {
    const savedreview = await newReview.save();
    res.status(200).json(savedreview);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get by appointment Id
router.get("/byAppointmentId/:appointmentId", async (req, res) => {
  try {
    const review = await Review.findOne({
      appointmentId: req.params.appointmentId,
    });
    res.status(200).json(review);
    //console.log('reviews>>> ',reviews)
  } catch (err) {
    res.status(500).json(err);
  }
});
//get

router.get("/:doctorId", async (req, res) => {
  try {
    const reviews = await Review.find({
      doctorId: req.params.doctorId,
    });
    res.status(200).json(reviews);
    //console.log('reviews>>> ',reviews)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/deleteAll", (req, res) => {
  try {
    Review.deleteMany({}).then(function (result) {
      // process result
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
