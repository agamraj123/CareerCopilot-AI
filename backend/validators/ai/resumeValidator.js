const normalizeScore = require("../../utils/normalizers/scoreNormalizer");
const normalizeConfidence = require("../../utils/normalizers/confidenceNormalizer");
const normalizeDifficulty = require("../../utils/normalizers/difficultyNormalizer");
const normalizePriority = require("../../utils/normalizers/priorityNormalizer");
const normalizeSkill = require("../../utils/normalizers/skillNormalizer");

// =====================================
// Resume AI Response Validator
// =====================================

const validateResumeResponse = (
    analysis,
    processingTime,
    model
) => {

    return {

        // =====================================
        // Resume Score
        // =====================================

        resumeScore: normalizeScore(
            analysis.resumeScore
        ),

        // =====================================
        // Technical Skills
        // =====================================

        technicalSkills: (analysis.technicalSkills || []).map(skill => ({

            name: skill.name?.trim() || "",

            level: normalizeSkill(
                skill.level
            ),

            confidence: normalizeConfidence(
                skill.confidence
            )

        })),

        // =====================================
        // Soft Skills
        // =====================================

        softSkills: (analysis.softSkills || []).map(skill => ({

            name: skill.name?.trim() || "",

            level: normalizeSkill(
                skill.level
            ),

            confidence: normalizeConfidence(
                skill.confidence
            )

        })),

        // =====================================
        // Missing Skills
        // =====================================

        missingSkills: (analysis.missingSkills || []).map(skill => ({

            title: skill.title?.trim() || "",

            priority: normalizePriority(
                skill.priority
            ),

            reason: skill.reason?.trim() || ""

        })),

        // =====================================
        // Strengths
        // =====================================

        strengths: (analysis.strengths || []).map(item => ({

            title: item.title?.trim() || "",

            priority: normalizePriority(
                item.priority
            ),

            reason: item.reason?.trim() || ""

        })),

        // =====================================
        // Weaknesses
        // =====================================

        weaknesses: (analysis.weaknesses || []).map(item => ({

            title: item.title?.trim() || "",

            priority: normalizePriority(
                item.priority
            ),

            reason: item.reason?.trim() || ""

        })),

        // =====================================
        // Career Suggestions
        // =====================================

        careerSuggestions: (analysis.careerSuggestions || []).map(item => ({

            role: item.role?.trim() || "",

            matchPercentage: normalizeScore(
                item.matchPercentage
            ),

            reason: item.reason?.trim() || ""

        })),

        // =====================================
        // Interview Questions
        // =====================================

        interviewQuestions: (analysis.interviewQuestions || []).map(question => ({

            question: question.question?.trim() || "",

            difficulty: normalizeDifficulty(
                question.difficulty
            ),

            topic: question.topic?.trim() || ""

        })),

        // =====================================
        // Learning Roadmap
        // =====================================

        learningRoadmap: (analysis.learningRoadmap || []).map(item => ({

            title: item.title?.trim() || "",

            priority: normalizePriority(
                item.priority
            ),

            reason: item.reason?.trim() || ""

        })),

        // =====================================
        // ATS Suggestions
        // =====================================

        atsSuggestions: (analysis.atsSuggestions || []).map(item => ({

            title: item.title?.trim() || "",

            priority: normalizePriority(
                item.priority
            ),

            reason: item.reason?.trim() || ""

        })),

        // =====================================
        // Metadata
        // =====================================

        metadata: {

            model,

            analyzedAt: new Date(),

            processingTime

        }

    };

};

module.exports = validateResumeResponse;