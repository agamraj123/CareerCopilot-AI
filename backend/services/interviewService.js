const ai = require("../config/gemini");

const {
  buildInterviewPrompt,
} = require("../prompts/interviewPrompt");

const cleanResponse = require(
  "../utils/responseCleaner"
);

const parseResponse = require(
  "../utils/responseParser"
);

const validateInterviewResponse =
  require(
    "../validators/ai/interviewValidator"
  );

const getProcessingTime =
  require("../utils/responseTimer");

// =====================================
// Gemini Model
// =====================================

const MODEL = "gemini-2.5-flash";

// =====================================
// Generate AI Response
// =====================================

const generateAIResponse = async (
  prompt
) => {

  const response =
    await ai.models.generateContent({
      model: MODEL,
      contents: prompt,
    });

  if (
    !response ||
    !response.text
  ) {
    throw new Error(
      "Empty response received from Gemini."
    );
  }

  return response.text;
};

// =====================================
// Generate Interview Preparation
// =====================================

const generateInterview =
  async (
    resumeText,
    jobDescription = "",
    companyName = "",
    jobTitle = ""
  ) => {

    const startTime = Date.now();

    try {

      if (
        !resumeText ||
        !resumeText.trim()
      ) {
        throw new Error(
          "Resume text is required."
        );
      }

      console.log(
        "[INTERVIEW] Starting AI preparation..."
      );

      // =====================================
      // Build Prompt
      // =====================================

      const prompt =
        buildInterviewPrompt(
          resumeText,
          jobDescription,
          companyName,
          jobTitle
        );

      // =====================================
      // Gemini
      // =====================================

      const rawResponse =
        await generateAIResponse(
          prompt
        );

      console.log(
        "[INTERVIEW] Raw Gemini response received."
      );

      // =====================================
      // Clean Response
      // =====================================

      const cleanedResponse =
        cleanResponse(
          rawResponse
        );

      // =====================================
      // Parse JSON
      // =====================================

      const parsedResponse =
        parseResponse(
          cleanedResponse
        );

      // =====================================
      // Validate
      // =====================================

      const processingTime =
        getProcessingTime(
          startTime
        );

      const validatedResponse =
        validateInterviewResponse(
          parsedResponse,
          processingTime,
          MODEL
        );

      console.log(
        `[INTERVIEW] Completed in ${processingTime}ms`
      );

      return validatedResponse;

    } catch (error) {

      console.error(
        "[INTERVIEW] Service Error:",
        error
      );

      throw new Error(
        error.message ||
        "Failed to generate interview preparation."
      );
    }
  };

module.exports = {
  generateInterview,
};