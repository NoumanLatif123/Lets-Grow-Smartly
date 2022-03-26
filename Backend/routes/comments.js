const router = require("express").Router();
const Comment = require("../models/Comment");

//add

router.post("/", async (req, res) => {
  const newComment = new Comment(req.body);

  try {
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get

router.get("/:NoteId", async (req, res) => {
  try {
    const comments = await Comment.find({
      NoteId: req.params.NoteId,
    });
    //console.log("comments>>> ", comments);
    res.status(200).json(comments);
    //console.log('messages>>> ',messages)
  } catch (err) {
    res.status(500).json(err);
  }
});
router.delete("/deleteAll", (req, res) => {
  try {
    Comment.deleteMany({}).then(function (result) {
      // process result
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
