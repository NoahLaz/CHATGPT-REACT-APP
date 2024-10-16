import { useState } from "react";
import "./dashboardPage.css";
import ChatService from "../../services/chatService";
import model from "../../lib/gemini";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState();
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    imgPath: "",
    imgData: {},
  });

  const sendNewMessagesToDb = async (data) => {
    try {
      const response = await ChatService.create(data);
      return response.data._id;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await model.generateContent(
      Object.entries(img.imgData).length ? [img.imgData, prompt] : [prompt]
    );

    const answer = await result.response.text();

    const id = await sendNewMessagesToDb({
      title: answer.slice(0, 30),
      messages: [
        {
          role: "user",
          parts: prompt,
        },
        {
          role: "model",
          parts: answer,
        },
      ],
    });

    navigate(`/dashboard/chats/${id}`);
  };

  return (
    <div className="dashboardPage">
      <div className="content">
        <div className="logo">
          <img src="/logo.png" alt="" />
          <h3 className="title">NOAH AI</h3>
        </div>
        <div className="options">
          <div className="option">
            <img src="/chat.png" alt="" />
            <div className="text">Start a New Chat</div>
          </div>
          <div className="option">
            <img src="/image.png" alt="" />
            <div className="text">Analyze Images</div>
          </div>
          <div className="option">
            <img src="/code.png" alt="" />
            <div className="text">Help me with my Code</div>
          </div>
        </div>
      </div>
      <div className="formContainer">
        <form action="" className="promptForm">
          <textarea
            placeholder="Ask me Anything..."
            name="prompt"
            rows="1"
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
          ></textarea>
          <button onClick={handleSubmit}>
            <img src="/arrow.png" alt="" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default DashboardPage;
