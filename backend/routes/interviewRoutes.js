const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const validateRequest = require("../middleware/validateRequest");

const validateInterviewRequest =
  require("../validators/request/interviewValidator");

const {
  generateInterviewPreparation,
  getInterviewHistory,
  getInterviewById,
  deleteInterview,
} = require("../controllers/interviewController");

// =====================================
// Generate Interview Preparation
// =====================================

router.post(
  "/generate",
  protect,
  validateRequest(validateInterviewRequest),
  generateInterviewPreparation
);

// =====================================
// Interview History
// =====================================

router.get(
  "/history",
  protect,
  getInterviewHistory
);

// =====================================
// Single Interview
// =====================================

router.get(
  "/:id",
  protect,
  getInterviewById
);

// =====================================
// Delete Interview
// =====================================

router.delete(
  "/:id",
  protect,
  deleteInterview
);

module.exports = router;