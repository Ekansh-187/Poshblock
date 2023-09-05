import mongoose from "mongoose";
const { Schema } = mongoose;

const contractSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    creatorId: {
      type: String,
      required: true,
    },
    receiverId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    docLink: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    uploaded: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: "p",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Contract", contractSchema);
