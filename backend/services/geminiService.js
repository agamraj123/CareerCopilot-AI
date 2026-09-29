const ai = require("../config/gemini");
const logger = require("../utils/logger");
const {
  buildResumePrompt,
} = require("../prompts/resumePrompt");

const cleanResponse = require("../utils/responseCleaner");
const parseResponse = require("../utils/responseParser");
const validateResumeResponse =
require("../validators/ai/resumeValidator");
const getProcessingTime = require("../utils/responseTimer");

const {
    GEMINI_MODEL,
} = require("../config/constants");
// --------------------------------------
// Generate AI Response
// --------------------------------------

const generateAIResponse = async (prompt) => {
  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: prompt,
  });

  return response.text;
};

const analyzeResume = async (resumeText) => {
  const startTime = Date.now();

  try {
    // Step 1 - Build Prompt
    const prompt = buildResumePrompt(resumeText);

    // Step 2 - Get AI Response
    const rawResponse = await generateAIResponse(prompt);

    // Step 3 - Remove Markdown
    const cleanedResponse = cleanResponse(rawResponse);

    // Step 4 - Convert JSON String -> Object
    const parsedResponse = parseResponse(cleanedResponse);

    // Step 5 - Calculate Processing Time
    const processingTime = getProcessingTime(startTime);

    // Step 6 - Validate Response
    const validatedResponse =
   validateResumeResponse(
    parsedResponse,
    processingTime,
    GEMINI_MODEL
);

    return validatedResponse;
  } catch (error) {
    logger.error("Gemini Analysis Error:", error);

    throw new Error("Failed to analyze resume.");
  }
};

module.exports = {
  analyzeResume,
};