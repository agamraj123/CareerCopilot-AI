// =====================================
// Allowed Difficulty
// =====================================

const ALLOWED_DIFFICULTIES = [
  "Easy",
  "Medium",
  "Hard",
];

// =====================================
// Normalize Difficulty
// =====================================

const normalizeDifficulty = (difficulty) => {

  if (!difficulty) {
    return "Medium";
  }

  const value = difficulty.trim();

  if (ALLOWED_DIFFICULTIES.includes(value)) {
    return value;
  }

  switch (value.toLowerCase()) {

    case "beginner":
      return "Easy";

    case "moderate":
      return "Medium";

    case "advanced":
    case "very hard":
      return "Hard";

    default:
      return "Medium";
  }

};

module.exports = normalizeDifficulty;