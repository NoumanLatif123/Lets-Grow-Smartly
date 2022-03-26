const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    qualification: {
      type: String,
      required: false,
    },
    usertype: {
      type: String,
      required: false,
    },
    picture: {
      type: String,
    },
    approvalStatus: {
      type: String,
    },
    certificateImg: {
      type: String,
    },
    rating: {
      type: String,
      required: false,
      default: "no rating",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
