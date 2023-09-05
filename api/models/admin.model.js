import mongoose from "mongoose";
const { Schema } = mongoose;

const adminSchema = new Schema(
  {
    request: {
      type: String,
      unique: true,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    uploaded: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Admin", adminSchema);
