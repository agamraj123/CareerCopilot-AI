// =====================================
// Normalize Resume / Match Score
// =====================================

const normalizeScore = (score) => {

  let value = Number(score);

  if (isNaN(value)) {
    return 0;
  }

  if (value < 0) {
    return 0;
  }

  if (value > 100) {
    return 100;
  }

  return Math.round(value);

};

module.exports = normalizeScore;
