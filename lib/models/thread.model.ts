import mongoose from "mongoose";
import { boolean, date } from "zod";
const threadSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  community: { type: mongoose.Schema.Types.ObjectId, ref: "Community" },
  createdAt: {
    default: Date.now,
    type: Date,
  },
  parentId: {
    type: String,
  },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
});

const Thread = mongoose.models.Thread || mongoose.model("Thread", threadSchema);

export default Thread;
