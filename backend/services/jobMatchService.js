console.log("🔥🔥🔥 NEW JOB MATCH SERVICE CODE IS RUNNING 🔥🔥🔥");

const ai = require("../config/gemini");

const {
  buildJobMatchPrompt,
} = require("../prompts/jobMatchPrompt");

const cleanResponse = require("../utils/responseCleaner");

const parseResponse = require("../utils/responseParser");

const validateJobMatchResponse = require(
  "../validators/ai/jobMatchValidator"
);

const getProcessingTime = require(
  "../utils/responseTimer"
);

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

  if (!response || !response.text) {
    throw new Error(
      "Empty response received from Gemini."
    );
  }

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

    // =====================================
    // Validate Input
    // =====================================

    if (!resumeText?.trim()) {
      throw new Error(
        "Resume text is required."
      );
    }

    if (!jobDescription?.trim()) {
      throw new Error(
        "Job description is required."
      );
    }

    console.log(
      "[JOB MATCH] Starting analysis..."
    );

    // =====================================
    // Build Prompt
    // =====================================

    const prompt = buildJobMatchPrompt(
      resumeText,
      jobDescription
    );

    console.log(
      "[JOB MATCH] Prompt generated."
    );

    // =====================================
    // Generate Gemini Response
    // =====================================

    const rawResponse =
      await generateAIResponse(prompt);

    console.log(
      "\n========== RAW GEMINI RESPONSE =========="
    );

    console.log(rawResponse);

    console.log(
      "=========================================\n"
    );

    // =====================================
    // Clean Response
    // =====================================

    const cleanedResponse =
      cleanResponse(rawResponse);

    console.log(
      "[JOB MATCH] Response cleaned."
    );

    // =====================================
    // Parse JSON
    // =====================================

    const parsedResponse =
      parseResponse(cleanedResponse);

    console.log(
      "\n========== PARSED RESPONSE =========="
    );

    console.dir(parsedResponse, {
      depth: null,
    });

    console.log(
      "=====================================\n"
    );

    // =====================================
    // Validate / Normalize
    // =====================================

    const processingTime =
      getProcessingTime(startTime);

    const validatedResponse =
      validateJobMatchResponse(
        parsedResponse,
        processingTime,
        MODEL
      );

    console.log(
      "\n========== VALIDATED RESPONSE =========="
    );

    console.dir(validatedResponse, {
      depth: null,
    });

    console.log(
      "========================================\n"
    );

    console.log(
      `[JOB MATCH] Completed in ${processingTime}ms`
    );

    return validatedResponse;

  } catch (error) {

    console.error(
      "\n========== JOB MATCH SERVICE ERROR =========="
    );

    console.error(
      error.message ||
      "Unknown Job Match error"
    );

    console.error(error);

    console.error(
      "=============================================\n"
    );

    throw new Error(
      error.message ||
      "Failed to analyze job match."
    );
  }
};

// =====================================
// Export
// =====================================

module.exports = {
  analyzeJobMatch,
};