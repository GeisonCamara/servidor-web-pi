var winston = require('winston');
require('winston-daily-rotate-file');

function start() {
    winston.handleExceptions(new winston.transports.File({ filename: 'path/to/exceptions.log' }));
}

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({
	      	name: 'info-file',
	      	filename: 'filelog-info.log',
	      	level: 'info'
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
	    }),
	    new (winston.transports.File)({
	      	name: 'verbose-file',
	      	filename: 'filelog-verbose.log',
	      	level: 'verbose'
	    }),
	    new (winston.transports.File)({
	      	name: 'debug-file',
	      	filename: 'filelog-debug.log',
	      	level: 'debug'
	    })
    ]
});

logger.debug('Debugging info');
logger.verbose('Verbose info');
logger.info('Hello world');
logger.warn('Warning message');
logger.error('Error info');

module.exports = start();