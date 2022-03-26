const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: String,
    },
    userId: {
      type: String,
    },
    username: {
      type: String,
    },
    doctorId: {
      type: String,
    },
    rating: {
      type: String,
    },
    review: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", ReviewSchema);
