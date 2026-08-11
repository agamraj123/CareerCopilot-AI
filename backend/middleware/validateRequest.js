const AppError = require("../utils/AppError");

// =====================================
// Validation Middleware
// =====================================

const validateRequest = (validator) => {

    return (req, res, next) => {

        const { error, value } = validator(req);

        if (error) {
            return next(new AppError(error, 400));
        }

        if (value) {
            req.body = value;
        }

        next();

    };

};

module.exports = validateRequest;