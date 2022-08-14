class ErrorClassification extends Error{
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

const createError = function(message, statusCode) {
    return new ErrorClassification(message, statusCode);
}

module.exports = {ErrorClassification, createError};