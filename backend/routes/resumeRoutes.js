const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");
const validateRequest = require("../middleware/validateRequest");

const validateResumeUpload = require(
    "../validators/request/resumeValidator"
);
const {
  uploadResume,
  getMyResume,
  reanalyzeResume,
  deleteResume,
} = require("../controllers/resumeController");

// Upload Resume
router.post(
  "/upload",
  protect,
  upload.single("resume"),
  validateRequest(validateResumeUpload),
  uploadResume
);

// Get My Resume
router.get(
  "/me",
  protect,
  getMyResume
);

router.put(
  "/reanalyze",
  protect,
  reanalyzeResume
);

router.delete(
  "/",
  protect,
  deleteResume
);
module.exports = router;