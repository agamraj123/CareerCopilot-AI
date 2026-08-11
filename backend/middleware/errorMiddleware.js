const logger = require("../utils/logger");
const { errorResponse } = require("../utils/apiResponse");

// =====================================
// Global Error Handler
// =====================================

const errorHandler = (

    err,

    req,

    res,

    next

) => {

    const statusCode = err.statusCode || 500;

    logger.error("Unexpected Error",err);

    return errorResponse(

        res,

        err.message || "Internal Server Error",

        statusCode,

        process.env.NODE_ENV === "production"

            ? null

            : {

                stack: err.stack,

            }

    );

};

module.exports = errorHandler;