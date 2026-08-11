const ai = require("../config/gemini");

const testGemini = async (req, res) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Say Hello from Gemini AI",
    });

    res.json({
      success: true,
      response: response.text,
    });

  } catch (error) {
    logger.error("Unexpected Error",error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  testGemini,
};