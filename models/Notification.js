const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  work: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Work"
  },

  type: {
    type: String,
    enum: ["devoir", "lecon", "exercice"],
    required: true
  },

  title: {
    type: String,
    required: true
  },

  isRead: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }

}, { timestamps: true });

module.exports = mongoose.model("Notification", notificationSchema);