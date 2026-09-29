const normalizeQuestions = (
  questions = []
) => {

  return questions
    .filter(
      (item) =>
        item &&
        item.question &&
        item.topic
    )
    .map((item) => {

      const difficulty =
        ["Easy", "Medium", "Hard"].includes(
          item.difficulty
        )
          ? item.difficulty
          : "Medium";

      const allowedCategories = [
        "Technical",
        "DSA",
        "Core CS",
        "Project",
        "HR",
        "Role Specific",
      ];

      const category =
        allowedCategories.includes(
          item.category
        )
          ? item.category
          : "Technical";

      return {
        question: item.question.trim(),
        topic: item.topic.trim(),
        difficulty,
        category,
        answerGuidance: (
          item.answerGuidance || ""
        ).trim(),
      };
    });
};

const validateInterviewResponse = (
  analysis,
  processingTime,
  model
) => {

  return {
    questions: normalizeQuestions(
      analysis.questions || []
    ),

    metadata: {
      model,
      processingTime,
      generatedAt: new Date(),
    },
  };
};

module.exports =
  validateInterviewResponse;