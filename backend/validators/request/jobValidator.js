const validateJobRequest = (req) => {

    const {

        companyName,

        jobTitle,

        jobDescription,

    } = req.body;

    if (!companyName?.trim()) {

        return {

            error: "Company name is required.",

        };

    }

    if (!jobTitle?.trim()) {

        return {

            error: "Job title is required.",

        };

    }

    if (!jobDescription?.trim()) {

        return {

            error: "Job description is required.",

        };

    }

    return {

        value: {

            companyName: companyName.trim(),

            jobTitle: jobTitle.trim(),

            jobDescription: jobDescription.trim(),

        },

    };

};

module.exports = validateJobRequest;