const fs = require("fs");
const pdfParse = require("pdf-parse");
const logger = require("../utils/logger");
const Resume = require("../models/Resume");

const {
  analyzeResume,
} = require("../services/geminiService");
const {
    deleteUploadedFile,
} = require("../utils/fileUtils");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

const {
  successResponse,
} = require("../utils/apiResponse");

// =====================================
// Helper - Delete Uploaded File
// =====================================

// =====================================
// Helper - Delete Uploaded File
// =====================================



// =====================================
// Helper - Find User Resume
// =====================================

const findUserResume = async (userId) => {

  const resume = await Resume.findOne({

    userId,

  });

  if (!resume) {

    throw new AppError(

      "Resume not found.",

      404

    );

  }

  return resume;

};

// =====================================
// Upload Resume
// =====================================

const uploadResume = asyncHandler(async (req, res) => {

    if (!req.file) {

        throw new AppError(
            "Resume file is required.",
            400
        );

    }

    try {

        const pdfBuffer = fs.readFileSync(req.file.path);

        const data = await pdfParse(pdfBuffer);
        if (!data.text.trim()) {

    throw new AppError(

        "Unable to extract text from the uploaded PDF.",

        400

    );

}

        let aiAnalysis = null;

        try {

            aiAnalysis = await analyzeResume(
                data.text
            );

        } catch (error) {

            logger.error(
                "AI Analysis Failed:",
                error.message
            );

            aiAnalysis = null;

        }

        const resume = await Resume.findOneAndUpdate(

    {
        userId: req.user.id,
    },

    {
        userId: req.user.id,
        fileName: req.file.filename,
        resumeText: data.text,
        aiAnalysis,
    },

    {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
    }

);

        return successResponse(

            res,

            resume,

            aiAnalysis
                ? "Resume uploaded and analyzed successfully."
                : "Resume uploaded successfully, but AI analysis failed."

        );

    }

    finally {

        deleteUploadedFile(req.file.path);

    }

});

// =====================================
// Get My Resume
// =====================================

const getMyResume = asyncHandler(async (req, res) => {

  const resume = await findUserResume(

    req.user.id

  );

  return successResponse(

    res,

    resume,

    "Resume fetched successfully."

  );

});

// =====================================
// Reanalyze Resume
// =====================================

const reanalyzeResume = asyncHandler(async (req, res) => {

  const resume = await findUserResume(

    req.user.id

  );

  const aiAnalysis = await analyzeResume(

    resume.resumeText

  );

  resume.aiAnalysis = aiAnalysis;

  await resume.save();

  return successResponse(

    res,

    resume,

    "Resume reanalyzed successfully."

  );

});

// =====================================
// Delete Resume
// =====================================

const deleteResume = asyncHandler(async (req, res) => {

  const resume = await findUserResume(

    req.user.id

  );

  await resume.deleteOne();

  return successResponse(

    res,

    null,

    "Resume deleted successfully."

  );

});

module.exports = {

  uploadResume,

  getMyResume,

  reanalyzeResume,

  deleteResume,

};