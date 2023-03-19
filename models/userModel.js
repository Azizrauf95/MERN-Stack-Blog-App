const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      trim:true,
      min :5,
      max :25,
    },
    email: {
      type: String,
      required: [true, "email is required"],
     
    },
    password: {
      type: String,
      required: [true, "password is required"],
      min:6,
      max:12,
    },
    blogs: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Blog",
      },
    ],
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;