const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const validateRequest = require("../middleware/validateRequest");

const validateJobRequest = require(
    "../validators/request/jobValidator"
);
const {
  analyzeJob,
  getJobHistory,
  getJobById,
  updateJobStatus,
  deleteJob
} = require("../controllers/jobController");

// =====================================
// Analyze Job Match
// =====================================

router.post(
  "/match",
  protect,
  analyzeJob
);
router.get(
    "/history",
    protect,
    getJobHistory
);
router.get(
    "/:id",
    protect,
    getJobById
);
router.delete(
    "/:id",
    protect,
    deleteJob
);
module.exports = router;