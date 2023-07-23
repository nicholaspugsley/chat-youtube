import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const scriptSchema = new mongoose.Schema(
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
    description: {
      type: String,
      trim: true,
      required: true,
    },
    script_type: {
      type: String,
    },
    scriptContent: {
      type: {},
      required: true,
    },

    length: {
      type: String,
      trim: true,
      required: true,
    },
    topic: {
      type: String,
      trim: true,
      required: true,
    },
    keywords: {
      type: String,
      trim: true,
      required: true,
    },
    tone: {
      type: String,
      trim: true,
      required: true,
    },
    style: {
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

export default mongoose.model("Script", scriptSchema);
