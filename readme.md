just-logging
==================

This module provides very simple logging, and nothing else, for nodejs modules.

There are so many logging framework that it was faster to write one than to find
the right one for me. Usage and output kind of mimics log4j.

Installation
------------

Install from npm:

    npm install just-logging

Usage
-----

Get a logger with the default name (the current module filename):

    var logger = require('logger').getLogger();

Get a module with a specific name:

    var logger = require('logger').getLogger('MY-LOGGER');

Log messages at different log levels:

    logger.debug('Calibrating hyperplan gyroscopes...');

    logger.info('Running system checks %d out of %d', i, total);

    logger.warn('Polarization failure, switching to backup generator', error);

    logger.warn('Catastrophic failure!', error);

With the default settings, this outputs the following:

    [2012-09-23T07:04:37.990Z][WARN][6649][EngineSubSystem] Object.<anonymous>():14 Polarization failure, switching to backup generator [Error: null]
    [2012-09-23T07:04:37.996Z][DEBUG][6649][EngineSubSystem] init():4 Calibrating hyperplan gyroscope...
    [2012-09-23T07:04:37.997Z][INFO][6649][EngineSubSystem] runChecks():10 Running system checks 12 out of 287
    [2012-09-23T07:04:37.997Z][ERROR][6649][EngineSubSystem] shutdown():18 Catastrophic failure! [Error: Divided by e^(pi * i) + 1]

Configuration
-------------

### Level

The minimum level of the messages to log can be changed.
Levels allowed are `OFF`, `DEBUG`, `INFO`, `WARN`, `ERROR`:

    logger.level = 'WARN';

The level can also be changed for an other logger instance.
For instance, to reduce or turn off a noisy module:

    logger.getLogger('noisy-module.js').level = 'OFF';

### Format

    logger.format = '[%d{JSON}][%p][%t][%c] %M:%L %m';

Variables allowed in the format string:

* %d: date

* %d{FORMAT}: formatted date. Possible formats include:

    * JSON
    * ISOString
    * UTCString
    * DateString
    ...

* %p: type (`INFO`, `DEBUG`, etc)

* %t: process id

* %c: logger name

* %M: method name

* %L: line number

* %m: message

Contribute
----------

github repository:

    https://github.com/freongrr/node-just-logging
