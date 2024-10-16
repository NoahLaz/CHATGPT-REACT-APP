import mongoose from "mongoose";
const { Schema } = mongoose;

const userChatsSchema = new Schema(
  {
    userId: { type: String, required: true },
    chats: [
      {
        title: { type: String, required: true },
        messages: [
          {
            role: { type: String, required: true },
            parts: { type: String, required: true },
            image: { type: String, required: false },
            date: { type: Date, default: Date.now },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const UserChats = mongoose.model("UserChats", userChatsSchema);

export default UserChats;
