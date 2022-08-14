const { ErrorClassification } = require('./errorClassification');

const errorMiddleware = (err, req, res, next) => {
    if(err instanceof ErrorClassification) {
        return res.status(err.statusCode).json({ message: err.message })
    }
    return res.status(500).json('Something went wrong');
}

module.exports = errorMiddleware;
