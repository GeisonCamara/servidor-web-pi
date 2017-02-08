var winston = require('winston');
require('winston-daily-rotate-file');

var logger = new (winston.Logger)({
    transports: [
        new winston.transports.DailyRotateFile(
            {   filename: '/home/pi/node/trava/dev/servidor-web-pi/logs/log',
                datePattern: 'yyyy-MM-dd.',
                prepend: true,
                level: 'error',
                colorize: false,
                timestamp: true,
                json: false,
                handleExceptions: true
            }
        )
    ],
    exitOnError: false
});

module.exports = logger;