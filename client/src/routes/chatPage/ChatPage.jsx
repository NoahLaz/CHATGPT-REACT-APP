import "./chatPage.css";

import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import chatHistory from "../../lib/gemini";
import NewPrompt from "../../components/newPrompt/NewPrompt";
import ChatService from "../../services/chatService.js";

const ChatPage = () => {
  const [messages, setMessages] = useState();
  const [question, setQuestion] = useState();
  const [answer, setAnswer] = useState();

  const { id } = useParams();

  const ref = useRef(null);

  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    imgPath: "",
    imgData: {},
  });

  const getAllChats = async () => {
    try {
      const response = await ChatService.get(`/${id}`);
      setMessages(response.data.messages);
    } catch (error) {
      console.log(error);
    }
  };

  const getAiResponse = async (prompt) => {
    setQuestion(prompt);
    const result = await chatHistory.sendMessageStream(
      Object.entries(img.imgData).length ? [img.imgData, prompt] : [prompt]
    );
    let accumulatedText = "";
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      accumulatedText += chunkText;
      setAnswer(accumulatedText);
    }

    setImg({
      isLoading: false,
      error: "",
      imgPath: "",
      imgData: {},
    });
  };

  useEffect(() => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }, [question, answer, img]);

  useEffect(() => {
    getAllChats();
  }, [id]);

  return (
    <div className="chatPage">
      <div className="wrapper">
        <div className="chat">
          {messages?.map((item, index) => {
            if (item.role === "user") {
              return (
                <div key={index} className="message user">
                  {item.parts}
                </div>
              );
            } else {
              return (
                <div key={index} className="message bot">
                  {item.parts}
                </div>
              );
            }
          })}
          {question && <div className="message user">{question}</div>}
          {answer && <div className="message bot">{answer}</div>}
          {img?.isLoading && <div>Uploading Image...</div>}
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
