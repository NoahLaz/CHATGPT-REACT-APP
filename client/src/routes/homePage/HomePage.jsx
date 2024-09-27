import { Link } from "react-router-dom";
import "./homePage.css";
import { TypeAnimation } from "react-type-animation";
import { useState } from "react";

const HomePage = () => {
  const [typingAnimation, setTypingAnimation] = useState("human1");
  return (
    <div className="homePage">
      <img src="/orbital.png" alt="" className="orbital" />
      <div className="content">
        <div className="left">
          <h1>Noah AI</h1>
          <h2>Supercharge your creativity and productivity</h2>
          <h3>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            ut deleniti inventore nostrum maxime. Ad quis optio nemo
          </h3>
          <Link to={"/dashboard"}>Get Started</Link>
        </div>
        <div className="right">
          <div className="imgContainer">
            <div className="bgContainer">
              <div className="bg"></div>
            </div>
            <img src="/bot.png" alt="" className="bot" />

            <div className="chat">
              <img
                src={
                  typingAnimation === "human1"
                    ? "/human1.jpeg"
                    : typingAnimation === "human2"
                    ? "/human2.jpeg"
                    : "/bot.png"
                }
                alt=""
              />
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed out once, initially
                  ": We produce food for Mice",
                  2000, // wait 1s before replacing "Mice" with "Hamsters"
                  () => {
                    setTypingAnimation("bot");
                  },
                  ": We produce food for Hamsters",
                  2000,
                  () => {
                    setTypingAnimation("human2");
                  },
                  ": We produce food for Guinea Pigs",
                  2000,
                  () => {
                    setTypingAnimation("bot");
                  },
                  ": We produce food for Chinchillas",
                  2000,
                  () => {
                    setTypingAnimation("human1");
                  },
                ]}
                wrapper="span"
                repeat={Infinity}
                cursor={true}
                omitDeletionAnimation={true}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="terms">
        <img src="/logo.png" alt="" />
        <div className="links">
          <Link to={"/"}> Terms of Service</Link>
          <Link to={"/"}> Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
