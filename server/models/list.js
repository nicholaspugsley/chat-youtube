import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const listSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      lowercase: true,
    },
    title: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 320,
      required: true,
    },

    listContent: {
      type: String,
      trim: true,
      required: true,
    },
    quantity: {
      type: String,
      trim: true,
      required: true,
    },
    audience: {
      type: String,
      trim: true,
      required: true,
    },
    channel_description: {
      type: String,
      trim: true,
      required: true,
    },
    author: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("List", listSchema);
