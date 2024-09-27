import ChatList from "../../components/chatList/ChatList";
import "./dashboardPage.css";

const DashboardPage = () => {
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
          ></textarea>
          <button>
            <img src="/arrow.png" alt="" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default DashboardPage;
