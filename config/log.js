var winston = require('winston');
require('winston-daily-rotate-file');

function start() {
    //winston.handleExceptions(new winston.transports.File({ filename: 'path/to/exceptions.log' }));
}

winston.handleExceptions(new winston.transports.File({ filename: 'path/to/exceptions.log' }));

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({
	      	level: 'info',
            colorize: false,
            timestamp: true,
            json: true,
            filename: '/var/log/mylog.log',
            handleExceptions: true
	    }),
	    new (winston.transports.File)({
	      	name: 'error-file',
	      	filename: 'filelog-error.log',
	      	level: 'error'
	    }),
	    new (winston.transports.File)({
	      	name: 'warn-file',
	      	filename: 'filelog-warn.log',
	      	level: 'warn'
	    })
    ]
});

logger.debug('Debugging info');
logger.verbose('Verbose info');
logger.info('Info message');
logger.warn('Warning message');
logger.error('Error info');

module.exports = start();