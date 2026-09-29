const Resume = require("../models/Resume");
const Interview = require("../models/Interview");
const JobMatch = require("../models/JobMatch");

const {
  generateInterview,
} = require("../services/interviewService");

// =====================================
// Generate Interview Preparation
// =====================================

const generateInterviewPreparation = async (
  req,
  res,
  next
) => {
  try {
    const userId = req.user.id;

    const {
      jobDescription = "",
      companyName = "",
      jobTitle = "",
      jobMatchId = null,
    } = req.body;

    // =====================================
    // Find User Resume
    // =====================================

    const resume = await Resume.findOne({
      userId,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message:
          "Please upload a resume before generating interview preparation.",
      });
    }

    if (
      !resume.resumeText ||
      !resume.resumeText.trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Resume text is empty. Please upload your resume again.",
      });
    }

    // =====================================
    // Optional Job Match
    // =====================================

    let selectedJobMatch = null;

    if (jobMatchId) {
      selectedJobMatch =
        await JobMatch.findOne({
          _id: jobMatchId,
          userId,
        });

      if (!selectedJobMatch) {
        return res.status(404).json({
          success: false,
          message: "Job match not found.",
        });
      }
    }

    // =====================================
    // Generate AI Interview Preparation
    // =====================================

    const analysis =
      await generateInterview(
        resume.resumeText,
        jobDescription ||
          selectedJobMatch?.jobDescription ||
          "",
        companyName ||
          selectedJobMatch?.companyName ||
          "",
        jobTitle ||
          selectedJobMatch?.jobTitle ||
          ""
      );

    // =====================================
    // Save Interview Preparation
    // =====================================

    const interview =
      await Interview.create({
        userId,
        resumeId: resume._id,

        jobMatchId:
          selectedJobMatch?._id || null,

        companyName:
          companyName ||
          selectedJobMatch?.companyName ||
          "",

        jobTitle:
          jobTitle ||
          selectedJobMatch?.jobTitle ||
          "",

        questions:
          analysis.questions,

        metadata:
          analysis.metadata,
      });

    // =====================================
    // Success Response
    // =====================================

    return res.status(201).json({
      success: true,
      message:
        "Interview preparation generated successfully.",
      data: interview,
    });

  } catch (error) {
    next(error);
  }
};

// =====================================
// Get Interview History
// =====================================

const getInterviewHistory = async (
  req,
  res,
  next
) => {
  try {
    const userId = req.user.id;

    const interviews =
      await Interview.find({
        userId,
      })
        .sort({
          createdAt: -1,
        })
        .limit(20);

    return res.status(200).json({
      success: true,
      message:
        "Interview history fetched successfully.",
      data: interviews,
    });

  } catch (error) {
    next(error);
  }
};

// =====================================
// Get Single Interview
// =====================================

const getInterviewById = async (
  req,
  res,
  next
) => {
  try {
    const userId = req.user.id;

    const interview =
      await Interview.findOne({
        _id: req.params.id,
        userId,
      });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview preparation not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Interview preparation fetched successfully.",
      data: interview,
    });

  } catch (error) {
    next(error);
  }
};

// =====================================
// Delete Interview
// =====================================

const deleteInterview = async (
  req,
  res,
  next
) => {
  try {
    const userId = req.user.id;

    const interview =
      await Interview.findOneAndDelete({
        _id: req.params.id,
        userId,
      });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview preparation not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Interview preparation deleted successfully.",
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateInterviewPreparation,
  getInterviewHistory,
  getInterviewById,
  deleteInterview,
};