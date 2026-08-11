// =====================================
// Allowed Priority Levels
// =====================================

const ALLOWED_PRIORITIES = [
  "Low",
  "Medium",
  "High",
  "Critical",
];

// =====================================
// Normalize Priority
// =====================================

const normalizePriority = (priority) => {

  if (!priority) {
    return "Medium";
  }

  const value = priority.trim();

  if (ALLOWED_PRIORITIES.includes(value)) {
    return value;
  }

  switch (value.toLowerCase()) {

    case "urgent":
    case "highest":
    case "very high":
      return "Critical";

    case "important":
      return "High";

    case "normal":
      return "Medium";

    case "minor":
      return "Low";

    default:
      return "Medium";
  }

};

module.exports = normalizePriority;