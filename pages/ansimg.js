import { useState } from "react";
import axios from "axios";
import { arrayItems } from "../utils/optionList.js";
import { geminiRequest } from "../utils/apiRequest.js";
import { marked } from "marked";

export default function ImageAndChat() {
  const unsplashApiKey =  process.env.NEXT_PUBLIC_UNSPLASH_API_KEY;

  const [prompt, setPrompt] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatResult, setChatResult] = useState("");

  const unsplashApi = axios.create({
    baseURL: "https://api.unsplash.com",
    headers: {
      Authorization: `Client-ID ${unsplashApiKey}`,
    },
  });
  // addressbar:https://api.unsplash.com/photos/random?query=cat&count=9&client_id=mDIfcA0AouaUgNxTId4ZHRrIVodzxQzPy4u1Fm5IHVQ
  const handleGenerateClick = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const imageResponse = await unsplashApi.get("/photos/random", {
        params: {
          query: prompt,
          count: 9,
        },
      });
      const images = imageResponse.data.map((photo) => ({
        url: photo.urls.regular,
        description: photo.description || "No description available",
      }));
      setResults(images);

      const reqPrompt = `Tell me about:\n\n${prompt}`;
      const chatResponse = await geminiRequest(reqPrompt);
      if (chatResponse) {
        setChatResult(chatResponse);
      } else {
        setChatResult(
          "An error occurred while process. Please try again later"
        );
      }
    } catch (error) {
      console.error(error);
      setChatResult(error.message);
    }
    setLoading(false);
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
            .filter((item) => item.name === "Answer With Images")
            .map((item) => (
              <h2 className="text-center green" key={item.id}>
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
              onClick={handleGenerateClick}
              disabled={loading || prompt.length === 0}
              className="btn btn-primary mb-3"
              style={{ border: "none" }}>
              {loading ? "Generating..." : "Generate"}
            </button>

            {results.length > 0 && (
              <div className="row">
                {chatResult && (
                  <div className="row">
                    <p
                      style={{ color: "white" }}
                      dangerouslySetInnerHTML={{
                        __html: marked(chatResult),
                      }}></p>
                  </div>
                )}
                {results.map((image, index) => (
                  <div key={index} className="col-4">
                    <div className="image-container">
                      <img
                        src={image.url}
                        alt={`Generated Image ${index + 1}`}
                        className="img-fluid mb-3 gallery-image"
                        style={{ width: "100%", height: "300px" }}
                      />
                      <div className="image-overlay">
                        <p>{image.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
