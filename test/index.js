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


var slack = new Notifier.Slack({
    "webhookurl": "https://hooks.slack.com/services/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",
    "channel": "#report",
    "mention": [
        "@rei"
    ],
    "allow": "error|info",
    "name": "api",
	"icon": "http://icons.iconarchive.com/icons/custom-icon-design/flatastic-11/96/Megaphone-icon.png"
});

// user
slack.log('log message');
slack.info('info message');
slack.warn('warn message');
slack.error('error message');