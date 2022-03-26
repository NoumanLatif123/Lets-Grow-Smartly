const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    NoteId: {
      type: String,
    },
    senderId: {
      type: String,
    },
    senderName: {
      type: String,
    },
    text: {
      type: String,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
