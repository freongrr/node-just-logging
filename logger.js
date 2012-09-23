var util = require('util');

exports.getLogger = function (name) {
    return {
        name: name,
        format: "[%d{JSON}][%p][%t][%c] %M:%L %m",

        debug: function() {
            doLog(this, "DEBUG", arguments, false);
        },

        info: function() {
            doLog(this, "INFO", arguments, false);
        },

        warn: function() {
            doLog(this, "WARN", arguments, true);
        },

        error: function() {
            doLog(this, "ERROR", arguments, true);
        },
    };
}

function doLog(logger, type, args, stderr) {
    var stacktrace = new Error().stack;
    var callerLine = stacktrace.split("\n")[3];

    callerLine = callerLine.substr(callerLine.indexOf("at ") + 3, callerLine.length);

    var lineNumber = callerLine.split(":")[1];

    var loggerName = logger.name;
    if (!loggerName) {
        loggerName = callerLine.substr(callerLine.lastIndexOf("/") + 1);
        loggerName = loggerName.substr(loggerName, loggerName.indexOf(":"));
    }

    var methodName;
    if (callerLine.charAt(0) == "/") {
        methodName = "anonymous";
    } else {
        methodName = callerLine.split(" ")[0] + "()";
    }

    var message = util.format.apply(util, args);

    var formatted = logger.format;

    if (formatted.match(/%d(?:{(.+)})?/)) {
        var date = getDate(RegExp.$1);
        formatted = formatted.replace(/%d({.+})?/, date);
    }

    formatted = formatted.replace("%p", type);
    formatted = formatted.replace("%t", process.pid);
    formatted = formatted.replace("%c", loggerName);
    formatted = formatted.replace("%M", methodName);
    formatted = formatted.replace("%L", lineNumber);
    formatted = formatted.replace("%m", message);

    if (stderr) {
        console.log(formatted);
    } else {
        console.error(formatted);
    }
}

function getDate(format) {
    var date = new Date();
    if (format) {
        var f = date["to" + format];
        if (!f) {
            return "Invalid Date Format: " + format;
        }
        return f.apply(date);
    } else {
        return date.toString();
    }
}
