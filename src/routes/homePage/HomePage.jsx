import { Link } from "react-router-dom";
import "./homePage.css";
import { TypeAnimation } from "react-type-animation";

const HomePage = () => {
  return (
    <div className="homePage">
      <img src="/orbital.png" alt="" className="orbital" />
      <div className="left">
        <h1>Noah AI</h1>
        <h2>Supercharge your creativity and productivity</h2>
        <h3>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae ut
          deleniti inventore nostrum maxime. Ad quis optio nemo
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
            <img src="/bot.png" alt="" />
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                "Human 1: We produce food for Mice",
                1000, // wait 1s before replacing "Mice" with "Hamsters"
                "Bot: We produce food for Hamsters",
                1000,
                "Human 2: We produce food for Guinea Pigs",
                1000,
                "Bot : We produce food for Chinchillas",
                1000,
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
  );
};

export default HomePage;
