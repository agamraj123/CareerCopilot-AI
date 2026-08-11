const getProcessingTime = (startTime) => {

    return Date.now() - startTime;

};

module.exports = getProcessingTime;