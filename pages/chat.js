import { useState } from "react";
import { arrayItems } from "../utils/optionList.js";
import { marked } from "marked";
import { geminiRequest } from "../utils/apiRequest.js";

export default function Chat() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!prompt) return;
    const reqPrompt = prompt;
    setLoading(true);

    try {
      const result = await geminiRequest(reqPrompt);
      if (result) {
        setResult(result);
      } else {
        setResult("An error occurred while chatting. Please try again later");
      }
    } catch (error) {
      setResult(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="main">
      <div>
        <video className="background-video" autoPlay muted loop>
          <source src="/Overlay.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="container">
        <div className="row">
          {arrayItems
            .filter((item) => item.id === "chat")
            .map((item) => (
              <h2 key={item.id} className="text-center green">
                {item.description}
              </h2>
            ))}
          <div className="col-lg-10 mx-auto">
            <textarea
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Write your prompt.."
              className="form-control mb-3 textarea"
              style={{ outline: "none", boxShadow: "none" }}></textarea>

            <button
              onClick={handleClick}
              disabled={loading || prompt.length === 0}
              className="btn btn-primary mb-3"
              style={{ border: "none" }}>
              {loading ? "Generating..." : "Generate"}
            </button>

            <div className="row">
              <p
                style={{ color: "white" }}
                dangerouslySetInnerHTML={{ __html: marked(result) }}></p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
