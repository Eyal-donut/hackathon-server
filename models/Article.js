import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
      trim: true,
    },
    imageUrl: String,
    author: {
      type: String,
      trim: true,
    },
    description: String,
    articleURL: String,
    date: String,
    websiteName: String,
    category: String,
    isInHomePage: {
      type: Boolean,
      default: false,
    },
    slug: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      virtuals: true,
      // Hide the __v field from the frontend
      transform: function (_, ret) {
        delete ret.__v;
      },
    },
    toObject: {
      virtuals: true,
      // Hide the __v field from the frontend
      transform: function (_, ret) {
        delete ret.__v;
      },
    },
  }
);

export default mongoose.model("Article", ArticleSchema);
