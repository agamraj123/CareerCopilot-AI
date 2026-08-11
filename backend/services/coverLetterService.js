const ai = require("../config/gemini");

const {
  buildCoverLetterPrompt,
} = require("../prompts/coverLetterPrompt");

const cleanResponse = require("../utils/responseCleaner");

const parseResponse = require("../utils/responseParser");

const validateCoverLetterResponse = require("../validators/ai/coverLetterValidator");

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
// Generate Cover Letter
// =====================================

const generateCoverLetter = async (

  resumeText,

  companyName,

  jobTitle,

  jobDescription

) => {

  const startTime = Date.now();

  try {

    // ================================
    // Build Prompt
    // ================================

    const prompt = buildCoverLetterPrompt(

      resumeText,

      companyName,

      jobTitle,

      jobDescription

    );

    // ================================
    // Gemini Response
    // ================================

    const rawResponse = await generateAIResponse(prompt);

    logger.success("\n========== RAW COVER LETTER RESPONSE ==========");
    logger.success(rawResponse);
    logger.success("===============================================\n");

    // ================================
    // Clean Response
    // ================================

    const cleanedResponse =
      cleanResponse(rawResponse);

    // ================================
    // Parse Response
    // ================================

    const parsedResponse =
      parseResponse(cleanedResponse);

    logger.success("\n========== PARSED RESPONSE ==========");
    console.dir(parsedResponse, { depth: null });
    logger.success("=====================================\n");

    // ================================
    // Validate Response
    // ================================

    const validatedResponse =
      validateCoverLetterResponse(

        parsedResponse,

        getProcessingTime(startTime),

        MODEL

      );

    logger.success("\n========== VALIDATED RESPONSE ==========");
    console.dir(validatedResponse, { depth: null });
    logger.success("========================================\n");

    return validatedResponse;

  } catch (error) {

    logger.error(
      "\n========== COVER LETTER SERVICE ERROR =========="
    );

    logger.error("Unexpected Error",error);

    logger.error(
      "================================================\n"
    );

    throw new Error(
      "Failed to generate cover letter."
    );

  }

};

module.exports = {

  generateCoverLetter,

};