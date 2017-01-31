var winston = require('winston');
require('winston-daily-rotate-file');

function start() {
    winston.handleExceptions(new winston.transports.File({ filename: 'path/to/exceptions.log' }));
}



var transport = new winston.transports.DailyRotateFile({
    filename: './log',
    datePattern: 'yyyy-MM-dd.',
    prepend: true,
    level: process.env.ENV === 'development' ? 'debug' : 'info'
});

var logger = new (winston.Logger)({
    transports: [
        transport
    ]
});

logger.warn('Hello World!');

module.exports = start();