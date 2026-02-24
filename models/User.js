const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true
  },
  number:{
    type: String,
    required: true
  },
  role: {
    enum: ["eleve","professeur"],
    required: true,
    type: String
   }
  },
  {
    timestamps: true
  }
  );
module.exports  = mongoose.model("User",userSchema);


