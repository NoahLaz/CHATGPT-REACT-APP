import "./newPrompt.css";

const NewPrompt = () => {
  return (
    <div className="newPrompt">
      <form action="" className="promptForm">
        <label htmlFor="file" className="attachment">
          <img src="/attachment.png" alt="" />
        </label>
        <input id="file" type="file" hidden multiple={false} />
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
  );
};

export default NewPrompt;
