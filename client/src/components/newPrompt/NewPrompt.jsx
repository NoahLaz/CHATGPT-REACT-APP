import { useState } from "react";
import UploadImage from "../upload/UploadImage";

import "./newPrompt.css";

const NewPrompt = ({ setImg, getAiResponse }) => {
  const [prompt, setPrompt] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt) return;
    getAiResponse(prompt);
    setPrompt("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents new line from being added
      handleSubmit(e);
    }
  };

  return (
    <>
      <form action="" className="promptForm">
        <UploadImage setImg={setImg} />
        <textarea
          placeholder="Ask me Anything..."
          name="prompt"
          rows="1"
          value={prompt}
          onKeyDown={handleKeyPress}
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
        ></textarea>
        <button onClick={handleSubmit}>
          <img src="/arrow.png" alt="" />
        </button>
      </form>
    </>
  );
};

export default NewPrompt;
