const winston = require('winston');

const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    defaultMeta: {service: 'api-service'},
    transports: [
        new winston.transports.File({filename: 'error.log', level: 'error'})
    ]
});

module.exports = logger;
