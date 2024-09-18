const logger = require('../services/logger');
const {log} = require("winston");

const errorHandler = (err, req, res, next) => {

    res.status(err.statusCode || 500).json({
        status: 'error',
        message: err.message || 'Internal Server Error',
    });
};

module.exports = errorHandler;
