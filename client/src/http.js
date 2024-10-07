import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3000/api/chats",
  headers: {
    "Content-type": "application/json",
  },
});
