import "./chatPage.css";

import { useEffect, useRef, useState } from "react";
import { IKImage } from "imagekitio-react";

import MarkDown from "react-markdown";
import model from "../../lib/gemini";
import NewPrompt from "../../components/newPrompt/NewPrompt";

const chatHistory = model.startChat({
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
  const [question, setQuestion] = useState();
  const [answer, setAnswer] = useState();

  const ref = useRef(null);

  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    imgPath: "",
    imgData: {},
  });

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

  return (
    <div className="chatPage">
      <div className="wrapper">
        <div className="chat">
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
