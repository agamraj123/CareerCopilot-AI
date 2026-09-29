// =====================================
// AI Role
// =====================================

const ROLE = `
You are an expert Software Engineering Interviewer,
Technical Recruiter, Senior Software Engineer,
and Interview Preparation Coach.

Your job is to prepare a candidate for a realistic
software engineering interview based strictly on:

1. The candidate's resume
2. The target job description
3. The target company and role when available
`;

// =====================================
// Task
// =====================================

const TASK = `
Generate a practical interview preparation set.

The questions should test:

• Technical knowledge
• Data Structures and Algorithms
• Core Computer Science
• Projects
• Resume-specific experience
• Role-specific technologies
• Behavioral / HR preparation

Questions must be relevant to the candidate's
actual resume and the supplied job description.
`;

// =====================================
// Question Distribution
// =====================================

const DISTRIBUTION = `
Generate approximately:

• 5 Technical questions
• 4 DSA questions
• 4 Core CS questions
• 3 Project questions
• 3 HR questions
• 3 Role Specific questions

Total: approximately 22 questions.

Avoid unnecessary repetition.
`;

// =====================================
// Rules
// =====================================

const RULES = `
Rules:

1. Return ONLY valid JSON.
2. Do NOT return markdown.
3. Do NOT use code fences.
4. Do NOT add explanations outside JSON.
5. Every question must have:
   - question
   - topic
   - difficulty
   - category
   - answerGuidance

6. difficulty must be one of:
   Easy
   Medium
   Hard

7. category must be one of:
   Technical
   DSA
   Core CS
   Project
   HR
   Role Specific

8. Do not invent experience that does not exist
   in the resume.

9. Project questions must be based on actual
   projects mentioned in the resume.

10. If a technology is mentioned in the job
    description but not the resume, questions
    can test whether the candidate understands
    the technology, but do not claim the
    candidate has experience with it.

11. HR questions should be realistic for a
    software engineering candidate.

12. Answer guidance should tell the candidate
    what concepts or points should be covered.
`;

// =====================================
// Output Schema
// =====================================

const OUTPUT_SCHEMA = `
Return ONLY this JSON structure:

{
  "questions": [
    {
      "question": "Explain the difference between TCP and UDP.",
      "topic": "Computer Networks",
      "difficulty": "Medium",
      "category": "Core CS",
      "answerGuidance": "Explain connection-oriented versus connectionless communication, reliability, ordering, overhead, and common use cases."
    }
  ]
}
`;

// =====================================
// Prompt Builder
// =====================================

const buildInterviewPrompt = (
  resumeText,
  jobDescription = "",
  companyName = "",
  jobTitle = ""
) => {
  return `
${ROLE}

${TASK}

${DISTRIBUTION}

${RULES}

${OUTPUT_SCHEMA}

========================================
TARGET ROLE
========================================

Company:
${companyName || "Not specified"}

Job Title:
${jobTitle || "Software Engineer"}

========================================
RESUME
========================================

${resumeText}

========================================
JOB DESCRIPTION
========================================

${jobDescription || "No job description provided."}

========================================
END OF INPUT
========================================
`;
};

module.exports = {
  buildInterviewPrompt,
};