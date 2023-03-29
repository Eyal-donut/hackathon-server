import mongoose from "mongoose";

const EditorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please add a first name"],
      trim: true,
      maxlength: [50, "Name can not be more than 50 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Please add a last name"],
      trim: true,
      maxlength: [50, "Name can not be more than 50 characters"],
    },
    email: {
      type: String,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
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

export default mongoose.model("Editor", EditorSchema);