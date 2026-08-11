// =====================================
// Normalize Confidence
// =====================================

const normalizeConfidence = (confidence) => {

  let value = Number(confidence);

  if (isNaN(value)) {
    return 80;
  }

  if (value < 0) {
    return 0;
  }

  if (value > 100) {
    return 100;
  }

  return Math.round(value);

};

module.exports = normalizeConfidence;