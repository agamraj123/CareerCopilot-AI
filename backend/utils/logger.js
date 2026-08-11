// =====================================
// Logger Utility
// =====================================

const formatTime = () => {
    return new Date().toISOString();
};

const logger = {

    info(message) {
        console.log(
            `[INFO] ${formatTime()} - ${message}`
        );
    },

    warn(message) {
        console.warn(
            `[WARN] ${formatTime()} - ${message}`
        );
    },

    error(message, error = null) {
        console.error(
            `[ERROR] ${formatTime()} - ${message}`
        );

        if (error) {
            console.error(error);
        }
    },

    success(message) {
        console.log(
            `[SUCCESS] ${formatTime()} - ${message}`
        );
    }

};

module.exports = logger;