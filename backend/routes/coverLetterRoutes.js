const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const validateRequest = require("../middleware/validateRequest");

const validateCoverLetterRequest = require(
    "../validators/request/coverLetterValidator"
);
const {

    createCoverLetter,

    getCoverLetterHistory,

    getCoverLetterById,

    deleteCoverLetter,

} = require("../controllers/coverLetterController");

// =====================================
// Generate Cover Letter
// =====================================

router.post(
    "/generate",
    protect,
    validateRequest(validateCoverLetterRequest),
    createCoverLetter
);

// =====================================
// Get Cover Letter History
// =====================================

router.get(
    "/history",
    protect,
    getCoverLetterHistory
);

// =====================================
// Get Single Cover Letter
// =====================================

router.get(
    "/:id",
    protect,
    getCoverLetterById
);

// =====================================
// Delete Cover Letter
// =====================================

router.delete(
    "/:id",
    protect,
    deleteCoverLetter
);

module.exports = router;