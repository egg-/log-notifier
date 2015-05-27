# log-notifier

[![version](https://img.shields.io/npm/v/log-notifier.svg) ![download](https://img.shields.io/npm/dm/log-notifier.svg)](https://www.npmjs.com/package/log-notifier)

simple notifier for logs.

## Usage

```javascript
var Notifier = require('log-notifier');

var notifier = null;

if (mode === 'development') {
    notifier = new Notifier.Logger({
        prefix: 'hostname',
        format: 'lll'
    });
} else {
    if (target === 'hipchat') {
        // hipchat
        notifier = new Notifier.Hipchat({
            "room": "monitor",
            "auth_token": "__auth_token__",
            "room_token": "__room_token__",
            "mention": [
              "@rei"    // for push notification
            ],
            "allow": "error|info",
            "prefix": "api"
        });
    } else if (target === 'slack') {
        notifier = new Notifier.Slack({
            "webhookurl": "__webhookurl__",
            "channel": "#report",
            "mention": [
                "@rei"
            ],
            "allow": "error|info",
            "name": "api",
            "icon": "https://slack.com/img/icons/app-57.png"
        });
    }
}

// use
notifier.log('message');
notifier.info('message');
notifier.warn('message');
notifier.error('message');



```


## Available
* Hipchat: https://www.hipchat.com/
* Slack Incoming Wehooks: https://my.slack.com/services/new/incoming-webhook/

## LICENSE

log-notifier is licensed under the MIT license.