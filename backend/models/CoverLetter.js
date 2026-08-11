const mongoose = require("mongoose");

// =====================================
// Cover Letter Schema
// =====================================

const coverLetterSchema = new mongoose.Schema(
  {
    // Logged-in User
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // Resume Used
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

    // Job Title
    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },

    // Original Job Description
    jobDescription: {
      type: String,
      required: true,
      trim: true,
    },

    // AI Generated Cover Letter
    coverLetter: {
      type: String,
      required: true,
    },

    // Short AI Summary
    summary: {
      type: String,
      default: "",
    },

    // Highlighted Skills
    keySkills: {
      type: [String],
      default: [],
    },

    // Highlighted Projects
    highlightedProjects: {
      type: [String],
      default: [],
    },

    // AI Customization Score
    customizationScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },

    // AI Metadata
    metadata: {
      model: {
        type: String,
        default: "gemini-2.5-flash",
      },

      processingTime: {
        type: Number,
        default: 0,
      },

      generatedAt: {
        type: Date,
        default: Date.now,
      },
    },
  },
  {
    timestamps: true,
  }
);

// =====================================
// Indexes
// =====================================

// User History
coverLetterSchema.index({
  userId: 1,
  createdAt: -1,
});

// Company Search
coverLetterSchema.index({
  companyName: 1,
});

// Resume Search
coverLetterSchema.index({
  resumeId: 1,
});

module.exports = mongoose.model(
  "CoverLetter",
  coverLetterSchema
);