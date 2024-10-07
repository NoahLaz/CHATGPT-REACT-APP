import express from "express";
import cors from "cors";
import ImageKit from "imagekit";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import Chat from "./models/chat.js";

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CON_STRING);
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
  }
};

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(cors());

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});

app.get("/api/upload", (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
});

app.post("/api/chats", async (req, res) => {
  try {
    const chat = req.body;
    const newChat = new Chat(chat);
    res.send(await newChat.save());
  } catch (error) {
    res.send(error);
  }
});

app.get("/api/chats", async (req, res) => {
  try {
    res.send(await Chat.find());
  } catch (error) {
    res.send(error);
  }
});

app.get("/api/chats/:id", async (req, res) => {
  const id = req.params.id;

  try {
    res.send(await Chat.findById(id));
  } catch (error) {
    res.send(error);
  }
});

app.put("/api/chats/:chatId", async (req, res) => {
  const chatId = req.params.chatId;
  const chat = req.body;

  try {
    const oldChat = await Chat.findById(chatId);
    const messages = [...oldChat.messages, ...chat.messages];
    await Chat.findByIdAndUpdate(chatId, { messages: messages });

    res.send(await Chat.findById(chatId));
  } catch (error) {
    res.send(error);
  }
});

app.listen(port, () => {
  dbConnect();
  console.log("server running on port 3000");
});
