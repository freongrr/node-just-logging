var logger = require('./logger.js').getLogger('EngineSubSystem');

// Simple logging:
function init() {
    logger.debug('Calibrating hyperplan gyroscope...');
}

// Using arguments in a message using util.format() syntax
function runChecks() {
    var i = 12;
    var total = 287;
    logger.info('Running system checks %d out of %d', i, total);
}

// Logging in an anonymous method
warn = function() {
    var error = new Error('null');
    logger.debug('The system is about to crash');
    logger.warn('Polarization failure, switching to backup generator', error);
}

// Passing an error to the logger
function shutdown() {
    var error = new Error('Divided by e^(pi * i) + 1');
    logger.error('Catastrophic failure!', error);
}

init();

// Change the log level
logger.level = 'INFO';

runChecks();
warn.call();
shutdown();
