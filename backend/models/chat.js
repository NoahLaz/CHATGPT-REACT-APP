import mongoose from "mongoose";
const { Schema } = mongoose;

const chatSchema = new Schema({
  title: { type: String, required: true },
  messages: [
    {
      role: { type: String, required: true },
      parts: { type: String, required: true },
      image: { type: String, required: false },
      date: { type: Date, default: Date.now },
    },
  ],
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
