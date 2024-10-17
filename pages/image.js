import { useState } from "react";
import axios from "axios";
import { arrayItems } from "../utils/optionList.js";

export default function Image({ imageUrls }) {
  const [prompt, setPrompt] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const unsplashApiKey = process.env.NEXT_PUBLIC_UNSPLASH_API_KEY; // My(prakash__api key)
      const response = await axios.get("https://api.unsplash.com/photos/random", {
        params: {
          query: prompt,
          count: 9,
        },
        headers: {
          Authorization: `Client-ID ${unsplashApiKey}`,
        },
      });

      setResults(imageUrls);
      setResults(response.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  // addressbar:https://api.unsplash.com/photos/random?query=cat&count=9&client_id=mDIfcA0AouaUgNxTId4ZHRrIVodzxQzPy4u1Fm5IHVQ
  
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
        .filter((item) => item.id === "image")
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
              style={{ outline: 'none', boxShadow: 'none'}}
            ></textarea>

            <button
              onClick={handleClick}
              disabled={loading || prompt.length === 0}
              className="btn btn-primary mb-3"
              style={{border:'none'}}
            >
              {loading ? "Generating..." : "Generate"}
            </button>

            <div className="row">
              {results.map((photo, index) => (
                <div key={index} className="col-4">
                  <div className="image-container">
                    <img
                      src={photo.urls.regular}
                      alt={`Generated Image ${index + 1}`}
                      className="img-fluid mb-3 gallery-image"
                      style={{ width: "100%", height: "300px" }}
                    />
                    <div className="image-overlay">
                      <p>{photo.description || 'No description available'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
