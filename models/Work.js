const mongoose = require("mongoose")
const workSchema = new mongoose.Schema({
  title : {
    type: String,
    required: true
  },
  note : {
    type: Number,
    required: true
  },
  classe: {
    type: String,
    required: true
  },
  deadline : {
    type: Date,
    required: true
  },
  description : {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ["devoir","lecon","exercice"],
    required: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
  },{
    timestamps: true
  })
module.exports = mongoose.model("Work",workSchema)
