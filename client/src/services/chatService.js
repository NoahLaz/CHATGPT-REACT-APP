import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3000/api/chats",
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
});

const getAll = () => {
  return http.get("/");
};

const get = (id) => {
  return http.get(`/${id}`);
};

const create = (chatData) => {
  return http.post("/", chatData);
};

const update = (id, newMessage) => {
  return http.put(`/${id}`, newMessage);
};

const remove = (id) => {
  return http.delete(`/${id}`);
};

const removeAll = () => {
  return http.delete(`/`);
};

const ChatService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
};

export default ChatService;
