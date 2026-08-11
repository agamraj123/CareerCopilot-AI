const ai = require("../config/gemini");

const {
  buildJobMatchPrompt,
} = require("../prompts/jobMatchPrompt");

const cleanResponse = require("../utils/responseCleaner");

const parseResponse = require("../utils/responseParser");

const validateJobMatchResponse = require("../validators/ai/jobMatchValidator");

const getProcessingTime = require("../utils/responseTimer");

// =====================================
// Gemini Model
// =====================================

const MODEL = "gemini-2.5-flash";

// =====================================
// Generate AI Response
// =====================================

const generateAIResponse = async (prompt) => {

  const response = await ai.models.generateContent({

    model: MODEL,

    contents: prompt,

  });

  return response.text;

};

// =====================================
// Analyze Job Match
// =====================================

const analyzeJobMatch = async (

  resumeText,

  jobDescription

) => {

  const startTime = Date.now();

  try {

    // ================================
    // Build Prompt
    // ================================

    const prompt = buildJobMatchPrompt(

      resumeText,

      jobDescription

    );

    // ================================
    // Generate Gemini Response
    // ================================

    const rawResponse = await generateAIResponse(prompt);

    logger.success("\n========== RAW GEMINI RESPONSE ==========");
    logger.success(rawResponse);
    logger.success("=========================================\n");

    // ================================
    // Clean Markdown
    // ================================

    const cleanedResponse = cleanResponse(rawResponse);

    // ================================
    // Parse JSON
    // ================================

    const parsedResponse = parseResponse(cleanedResponse);

    logger.success("\n========== PARSED RESPONSE ==========");
    console.dir(parsedResponse, { depth: null });
    logger.success("=====================================\n");

    // ================================
    // Validate Response
    // ================================

    const validatedResponse = validateJobMatchResponse(
      parsedResponse,
      getProcessingTime(startTime),
      MODEL
    );

    logger.success("\n========== VALIDATED RESPONSE ==========");
    console.dir(validatedResponse, { depth: null });
    logger.success("========================================\n");

    return validatedResponse;

  } catch (error) {

    logger.error("\n========== JOB MATCH SERVICE ERROR ==========");
    logger.error("Unexpected Error",error);
    logger.error("=============================================\n");

    throw new Error("Failed to analyze job match.");

  }

};

module.exports = {
  analyzeJobMatch,
};