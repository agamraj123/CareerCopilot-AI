const validateResumeUpload = (req) => {

    if (!req.file) {

        return {

            error: "Resume file is required.",

        };

    }

    return {

        value: req.body,

    };

};

module.exports = validateResumeUpload;
