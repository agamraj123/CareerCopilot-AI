const validateInterviewRequest = (req) => {
  const {
    jobDescription = "",
    companyName = "",
    jobTitle = "",
  } = req.body;

  return {
    value: {
      jobDescription: jobDescription.trim(),
      companyName: companyName.trim(),
      jobTitle: jobTitle.trim(),
    },
  };
};

module.exports = validateInterviewRequest;