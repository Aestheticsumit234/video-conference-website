import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  user_id: { type: String, required: true },
  meetingCode: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now() },
});

const Meeting = mongoose.model("Meeting", UserSchema);
export { Meeting };