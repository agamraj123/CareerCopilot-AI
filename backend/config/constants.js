// =====================================
// Pagination
// =====================================

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

// =====================================
// AI
// =====================================

const GEMINI_MODEL = "gemini-2.5-flash";

// =====================================
// Job Status
// =====================================

const JOB_STATUS = {
    ANALYZED: "Analyzed",
    APPLIED: "Applied",
    INTERVIEW: "Interview",
    REJECTED: "Rejected",
    OFFER: "Offer",
};

const ALLOWED_JOB_STATUS = Object.values(JOB_STATUS);

module.exports = {
    DEFAULT_PAGE,
    DEFAULT_LIMIT,
    GEMINI_MODEL,
    JOB_STATUS,
    ALLOWED_JOB_STATUS,
};