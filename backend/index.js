import express from "express";
import cors from "cors";
import ImageKit from "imagekit";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import UserChats from "./models/userChats.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

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
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});

app.get("/api/upload", (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
});

// Add a new chat for a user
app.post("/api/chats", ClerkExpressRequireAuth(), async (req, res) => {
  try {
    const userId = req.auth.userId;
    const data = req.body;
    const userChat = await UserChats.findOne({ userId });
    if (!userChat) {
      const newChat = new UserChats({
        userId,
        chats: data,
      });

      res.send(await newChat.save());
    } else {
      userChat.chats.push(data);
      const updatedUserChats = await userChat.save();
      res.send(updatedUserChats.chats.at(-1));
    }
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
});

app.get("/api/chats", ClerkExpressRequireAuth(), async (req, res) => {
  try {
    const userId = req.auth.userId;
    const userChat = await UserChats.findOne({ userId });

    res.send(userChat.chats);
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/chats/:id", ClerkExpressRequireAuth(), async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.auth.userId;
    const userChat = await UserChats.findOne({ userId });
    res.send(userChat.chats.find((chat) => chat._id.toString() === id));
  } catch (error) {
    console.log(error);
  }
});

app.put("/api/chats/:chatId", ClerkExpressRequireAuth(), async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const userId = req.auth.userId;
    const data = req.body;
    const userChat = await UserChats.findOne({ userId });
    userChat.chats
      .find((chat) => chat._id.toString() === chatId)
      .messages.push(...data.messages);

    res.send(userChat.save());
  } catch (error) {
    console.log(error);
  }
});

app.delete("/api/chats", async (req, res) => {
  try {
    res.send({
      message: (await UserChats.deleteMany({})).deletedCount,
    });
  } catch (error) {
    res.send(error);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(401).send("Unauthenticated!");
});

app.listen(port, () => {
  dbConnect();
  console.log("server running on port 3000");
});
