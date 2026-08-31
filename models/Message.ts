import mongoose, { Schema, model, models } from "mongoose";

export interface MessageDoc {
  name: string;
  email: string;
  subject?: string;
  message: string;
  read?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export const MessageSchema = new Schema(
  {
    name: { type: String, maxlength: 100, required: true },
    email: { type: String, maxlength: 254, required: true, lowercase: true },
    subject: { type: String, maxlength: 200, default: "" },
    message: { type: String, maxlength: 5000, required: true },
    read: { type: Boolean, default: false }
  },
  { timestamps: true }
);

MessageSchema.index({ createdAt: -1 });
MessageSchema.index({ read: 1, createdAt: -1 });

export const Message: mongoose.Model<MessageDoc> =
  (models.Message as mongoose.Model<MessageDoc>) ||
  model<MessageDoc>("Message", MessageSchema);
export default Message;
