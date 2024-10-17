
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

console.log("GEMINI_API_KEY ", GEMINI_API_KEY);


export const geminiRequest = async (prompt) => {

  if (!prompt) return;
  const reqBody = {
    contents: [
      {
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ],
  };

  try {
    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqBody),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    //Shorter   data.candidates[0]?.content.parts[0]?.text
    if (data && data.candidates && data.candidates.length > 0) {
      const content = data.candidates[0].content;

      if (content && content.parts && content.parts.length > 0) {
        const text = content.parts[0].text;
        
        if(text){
            return text;
        }
      } else {
        console.error( "Error fetching parts or content is empty:", content?.parts);
        return null;
      }
    } else {
      console.error("Error fetching candidates or no candidates available:", data.candidates);
        return null;
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred while making request.");
  }
};
