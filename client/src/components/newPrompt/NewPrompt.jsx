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
  return (
    <>
      <form action="" className="promptForm" onSubmit={handleSubmit}>
        <UploadImage setImg={setImg} />
        <textarea
          placeholder="Ask me Anything..."
          name="prompt"
          rows="1"
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
        ></textarea>
        <button>
          <img src="/arrow.png" alt="" />
        </button>
      </form>
    </>
  );
};

export default NewPrompt;
