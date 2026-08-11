// =====================================
// Allowed Skill Levels
// =====================================

const ALLOWED_SKILL_LEVELS = [
  "Beginner",
  "Intermediate",
  "Advanced",
];

// =====================================
// Normalize Skill Level
// =====================================

const normalizeSkillLevel = (level) => {

  if (!level) {
    return "Intermediate";
  }

  const value = level.trim();

  if (ALLOWED_SKILL_LEVELS.includes(value)) {
    return value;
  }

  switch (value.toLowerCase()) {

    case "basic":
      return "Beginner";

    case "expert":
    case "professional":
      return "Advanced";

    default:
      return "Intermediate";
  }

};

module.exports = normalizeSkillLevel;