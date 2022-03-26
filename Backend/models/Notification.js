const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    receiverId: {
      type: String,
    },
    forAdmins: {
      type: Boolean,
    },
    text: {
      type: String,
    },
    read: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", NotificationSchema);
