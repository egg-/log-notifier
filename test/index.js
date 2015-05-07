"use strict";

var Notifier = require('..');

var logger = new Notifier.Logger();

// use
logger.log('log message');
logger.info('info message');
logger.warn('warn message');
logger.error('error message');


var hipchat = new Notifier.Hipchat({
    "room": "monitor",
    "auth_token": "__auth_token__",
    "room_token": "__room_token__",
    "mention": [
      "@rei"
    ],
    "allow": "error|info",
    "prefix": "api"
});


// use
hipchat.log('log message');
hipchat.info('info message');
hipchat.warn('warn message');
hipchat.error('error message');