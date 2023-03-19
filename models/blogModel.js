const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "title is required"],
      trim:true,
      min :5,
      max :25,
    },
    description: {
      type: String,
      required: [true, "description is require"],
      trim:true,
      min :5,
      max :200,
    },
    image: {
      type: String,
      required: [true, "image is require"],
      trim:true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      require: [true, "user id is required"],
    },
  },
  { timestamps: true }
);

const blogModel = mongoose.model("Blog", blogSchema);

module.exports = blogModel;