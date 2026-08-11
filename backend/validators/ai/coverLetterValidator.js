const normalizeScore = require("../../utils/normalizers/scoreNormalizer");

// =====================================
// Remove Duplicate Strings
// =====================================

const removeDuplicates = (arr = []) => {

    const seen = new Set();

    return arr.filter((item) => {

        const value = (item || "")
            .trim()
            .toLowerCase();

        if (!value || seen.has(value)) {
            return false;
        }

        seen.add(value);

        return true;

    });

};

// =====================================
// Cover Letter Validator
// =====================================

const validateCoverLetterResponse = (

    response,

    processingTime,

    model

) => {

    return {

        coverLetter:
            (response.coverLetter || "").trim(),

        summary:
            (response.summary || "").trim(),

        keySkills:
            removeDuplicates(
                response.keySkills || []
            ),

        highlightedProjects:
            removeDuplicates(
                response.highlightedProjects || []
            ),

        customizationScore:
            normalizeScore(
                response.customizationScore
            ),

        metadata: {

            model,

            processingTime,

            generatedAt: new Date(),

        },

    };

};

module.exports = validateCoverLetterResponse;