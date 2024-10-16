import "./chatPage.css";

import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import NewPrompt from "../../components/newPrompt/NewPrompt";
import ChatService from "../../services/chatService.js";
import model from "../../lib/gemini.js";
import { IKImage } from "imagekitio-react";

const urlEndpoint = import.meta.env.VITE_IMAGE_KIT_ENDPOINT;
let chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [{ text: "Hello" }],
    },
    {
      role: "model",
      parts: [{ text: "Great to meet you. What would you like to know?" }],
    },
  ],
});
const ChatPage = () => {
  const [answer, setAnswer] = useState();
  const [question, setQuestion] = useState();
  const [messages, setMessages] = useState();
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    imgUrl: "",
    imgPath: "",
    imgData: {},
  });

  const { id } = useParams();

  const ref = useRef(null);

  const sendNewMessagesToDb = async (newMsg) => {
    try {
      const { data } = await ChatService.update(id, newMsg);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllChats = async () => {
    try {
      const { data } = await ChatService.get(id);
      console.log(data);
      setMessages(data.messages);
    } catch (error) {
      console.log(error);
    }
  };

  const createHistory = async () => {
    try {
      const { data } = await ChatService.get(id);
      const chatHistory = data.messages.map((item) => {
        return {
          role: item.role,
          parts: [{ text: item.parts }],
        };
      });
      chat = model.startChat({ history: [...chatHistory] });
    } catch (error) {
      console.log(error);
    }
  };

  const getAiResponse = async (prompt) => {
    await createHistory();

    let list = [...messages, { role: "user", parts: prompt }];
    setMessages(list);

    const result = await chat.sendMessageStream(
      Object.entries(img.imgData).length ? [img.imgData, prompt] : [prompt]
    );

    list.push({ role: "model", parts: "" });
    let accumelatedText = "";
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      accumelatedText += chunkText;
      list[list.length - 1].parts = accumelatedText;
      setMessages([...list]);
    }

    sendNewMessagesToDb({
      messages: [
        {
          role: "user",
          parts: prompt,
          image: img.imgUrl ? img.imgUrl : "",
        },
        {
          role: "model",
          parts: accumelatedText,
        },
      ],
    });
  };

  const scrollToLastMessage = () => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToLastMessage();
  }, [img, messages, question, answer]);

  useEffect(() => {
    getAllChats();
  }, [id, img, question]);

  useEffect(() => {
    setAnswer("");
    setQuestion("");
  }, []);

  return (
    <div className="chatPage">
      <div className="wrapper">
        <div className="chat">
          {messages?.map((item, index) => {
            return item.role === "user" ? (
              <div key={index} className="message user">
                {item.image && (
                  <IKImage
                    urlEndpoint={urlEndpoint}
                    src={item.image}
                    width="400"
                  />
                )}
                <ReactMarkdown>{item.parts}</ReactMarkdown>
              </div>
            ) : (
              <div key={index} className="message bot">
                <ReactMarkdown>{item.parts}</ReactMarkdown>
              </div>
            );
          })}

          {img?.isLoading && <div>Uploading Image...</div>}

          {img.imgUrl && (
            <div className="message user">
              <IKImage urlEndpoint={urlEndpoint} src={img.imgUrl} width="400" />
            </div>
          )}
          {/* {question && (
            <div className="message user">
              <ReactMarkdown>{question}</ReactMarkdown>
            </div>
          )}
          {answer && (
            <div className="message bot">
              <ReactMarkdown>{answer}</ReactMarkdown>
            </div>
          )} */}
          <div className="gap" ref={ref} />
          <div className="formContainer">
            <NewPrompt setImg={setImg} getAiResponse={getAiResponse} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
