const fs = require("fs");

const deleteUploadedFile = (filePath) => {

    if (filePath && fs.existsSync(filePath)) {

        fs.unlinkSync(filePath);

    }

};

module.exports = {

    deleteUploadedFile,

};