var winston = require('winston');
require('winston-daily-rotate-file');

var logger = new (winston.Logger)({
    transports: [
        new winston.transports.DailyRotateFile(
            {   filename: './../logs/log',
                datePattern: 'yyyy-MM-dd.',
                prepend: true,
                level: 'error',
                colorize: false,
                timestamp: true,
                json: true,
                handleExceptions: true
            }
        )
    ],
    exitOnError: false
});