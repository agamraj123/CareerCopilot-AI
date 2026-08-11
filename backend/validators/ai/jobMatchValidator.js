const normalizeScore = require("../../utils/normalizers/scoreNormalizer");
const normalizePriority = require("../../utils/normalizers/priorityNormalizer");

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
// Normalize Recommendation Array
// =====================================

const normalizeRecommendationArray = (arr = []) => {

    return arr

        .filter(item => item && item.title)

        .map(item => ({

            title: item.title.trim(),

            priority: normalizePriority(
                item.priority
            ),

            reason: (item.reason || "").trim()

        }));

};

// =====================================
// Job Match Validator
// =====================================

const validateJobMatchResponse = (

    analysis,

    processingTime,

    model

) => {

    return {

        overallMatch: normalizeScore(
            analysis.overallMatch
        ),

        matchedSkills: removeDuplicates(
            analysis.matchedSkills || []
        ),

        // Recommendation Objects
        missingSkills:
            normalizeRecommendationArray(
                analysis.missingSkills || []
            ),

        keywordSuggestions:
            removeDuplicates(
                analysis.keywordSuggestions || []
            ),

        strengths:
            normalizeRecommendationArray(
                analysis.strengths || []
            ),

        improvementSuggestions:
            normalizeRecommendationArray(
                analysis.improvementSuggestions || []
            ),

        interviewFocus:
            removeDuplicates(
                analysis.interviewFocus || []
            ),

        metadata: {

            model,

            processingTime,

            analyzedAt: new Date(),

        }

    };

};

module.exports = validateJobMatchResponse;