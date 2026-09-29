const mongoose = require("mongoose");

// =====================================
// Question Schema
// =====================================

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },

    topic: {
      type: String,
      required: true,
      trim: true,
    },

    difficulty: {
      type: String,
      enum: [
        "Easy",
        "Medium",
        "Hard",
      ],
      default: "Medium",
    },

    category: {
      type: String,
      enum: [
        "Technical",
        "DSA",
        "Core CS",
        "Project",
        "HR",
        "Role Specific",
      ],
      required: true,
    },

    answerGuidance: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    _id: true,
  }
);

// =====================================
// Interview Schema
// =====================================

const interviewSchema = new mongoose.Schema(
  {
    // User who generated the interview
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Resume used for preparation
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },

    // Optional Job Match reference
    jobMatchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobMatch",
      default: null,
    },

    companyName: {
      type: String,
      default: "",
      trim: true,
    },

    jobTitle: {
      type: String,
      default: "",
      trim: true,
    },

    // =====================================
    // Generated Questions
    // =====================================

    questions: {
      type: [questionSchema],
      default: [],
    },

    // =====================================
    // Metadata
    // =====================================

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

interviewSchema.index({
  userId: 1,
  createdAt: -1,
});

interviewSchema.index({
  jobMatchId: 1,
});

module.exports = mongoose.model(
  "Interview",
  interviewSchema
);