const mongoose = require("mongoose");
const recommendationSchema =
require("./schemas/recommendationSchema");
// =====================================
// Job Match Schema
// =====================================
const jobMatchSchema = new mongoose.Schema(
  {
    // User who performed the analysis
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Resume used for matching
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },

    // Company Information
    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },

    // Original Job Description
    jobDescription: {
      type: String,
      required: true,
    },

    // Overall Match Percentage
    overallMatch: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },

    // Skills Already Present
    matchedSkills: {
      type: [String],
      default: [],
    },

    // Missing Skills
    missingSkills: {
      type: [recommendationSchema],
      default: [],
    },

    // ATS Keywords Missing
    keywordSuggestions: {
      type: [String],
      default: [],
    },

    // Resume Strengths
    strengths: {
      type: [recommendationSchema],
      default: [],
    },

    // AI Suggestions
    improvementSuggestions: {
      type: [recommendationSchema],
      default: [],
    },

    // Interview Preparation Topics
    interviewFocus: {
      type: [String],
      default: [],
    },

    // Application Status
    status: {
      type: String,
      enum: [
        "Analyzed",
        "Applied",
        "Interview",
        "Rejected",
        "Offer"
      ],
      default: "Analyzed",
    },
  },
  {
    timestamps: true,
  }
);

// =====================================
// Indexes
// =====================================

// User's Job Match History
jobMatchSchema.index({
  userId: 1,
  createdAt: -1,
});

// Company Search
jobMatchSchema.index({
  companyName: 1,
});

// Resume Search
jobMatchSchema.index({
  resumeId: 1,
});

module.exports = mongoose.model(
  "JobMatch",
  jobMatchSchema
);