const SKILL_LEVELS = [
  "Beginner",
  "Intermediate",
  "Advanced",
];

const PRIORITIES = [
  "Low",
  "Medium",
  "High",
];

const DIFFICULTIES = [
  "Easy",
  "Medium",
  "Hard",
];

const clamp = (value, min, max, defaultValue) => {
  const number = Number(value);

  if (isNaN(number)) return defaultValue;

  return Math.min(max, Math.max(min, number));
};

const validateEnum = (
  value,
  allowed,
  defaultValue
) => {
  return allowed.includes(value)
    ? value
    : defaultValue;
};

const validateArray = (value) => {
  return Array.isArray(value)
    ? value
    : [];
};

const validateResumeScore = (score) => {
  return clamp(score, 0, 100, 0);
};

const validateSkill = (skill = {}) => {
  return {
    name: skill.name || "",

    level: validateEnum(
      skill.level,
      SKILL_LEVELS,
      "Intermediate"
    ),

    confidence: clamp(
      skill.confidence,
      0,
      100,
      80
    ),
  };
};

const validateRecommendation = (
  recommendation = {}
) => {
  return {
    title:
      recommendation.title || "",

    priority: validateEnum(
      recommendation.priority,
      PRIORITIES,
      "Medium"
    ),

    reason:
      recommendation.reason || "",
  };
};

const validateCareerSuggestion = (
  suggestion = {}
) => {
  return {
    role: suggestion.role || "",

    matchPercentage: clamp(
      suggestion.matchPercentage,
      0,
      100,
      0
    ),

    reason:
      suggestion.reason || "",
  };
};

const validateInterviewQuestion = (
  question = {}
) => {
  return {
    question:
      question.question || "",

    difficulty: validateEnum(
      question.difficulty,
      DIFFICULTIES,
      "Medium"
    ),

    topic:
      question.topic || "",
  };
};
const validateResponse = (
  analysis,
  processingTime = 0,
  model = "gemini-2.5-flash"
) => {
  analysis = analysis || {};

  return {
    resumeScore: validateResumeScore(
      analysis.resumeScore
    ),

    technicalSkills: validateArray(
      analysis.technicalSkills
    ).map(validateSkill),

    softSkills: validateArray(
      analysis.softSkills
    ).map(validateSkill),

    missingSkills: validateArray(
      analysis.missingSkills
    ).map(validateRecommendation),

    strengths: validateArray(
      analysis.strengths
    ).map(validateRecommendation),

    weaknesses: validateArray(
      analysis.weaknesses
    ).map(validateRecommendation),

    careerSuggestions: validateArray(
      analysis.careerSuggestions
    ).map(validateCareerSuggestion),

    interviewQuestions: validateArray(
      analysis.interviewQuestions
    ).map(validateInterviewQuestion),

    learningRoadmap: validateArray(
      analysis.learningRoadmap
    ).map(validateRecommendation),

    atsSuggestions: validateArray(
      analysis.atsSuggestions
    ).map(validateRecommendation),

    metadata: {
      model,

      processingTime,

      analyzedAt: new Date(),
    },
  };
};

module.exports = validateResponse;