import { useRef } from "react";
import "./chatPage.css";
import { useEffect } from "react";
import NewPrompt from "../../components/newPrompt/NewPrompt";

const ChatPage = () => {
  const ref = useRef(null);

  useEffect(() => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }, []);
  return (
    <div className="chatPage">
      <div className="wrapper">
        <div className="chat">
          <div className="message user">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa odit
            quidem, illo quas nam beatae praesentium recusandae ad laudantium
            soluta in quibusdam dolorem hic vero, sequi consequuntur dignissimos
            aliquid officiis.
          </div>
          <div className="message bot">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus vitae ipsa sint culpa, error recusandae nisi alias
            earum et possimus cupiditate sit voluptas, minus quaerat velit
            corrupti ut eaque? Nulla.
          </div>
          <div className="message user">Whats 2+2</div>
          <div className="message bot">2+2=4</div>
          <div className="message user">Whats 2+2</div>
          <div className="message bot">2+2=4</div>
          <div className="message user">Whats 2+2</div>
          <div className="message bot">2+2=4</div>
          <div className="message user">Whats 2+2</div>
          <div className="message bot">2+2=4</div>
          <div className="message user">Whats 2+2</div>
          <div className="message bot">2+2=4</div>
          <div className="message user">Whats 2+2</div>
          <div className="message bot">2+2=4</div>
          <div className="message user">Whats 2+2</div>
          <div className="message bot">2+2=4</div>
          <div className="message user">Whats 2+2</div>
          <div className="message bot">2+2=4</div>
          <div className="message user">Whats 2+2</div>
          <div className="message bot">2+2=4</div>
          <div ref={ref} />
        </div>
        <div className="formContainer">
          <NewPrompt />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
