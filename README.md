# log-notifier

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
    notifier = new Notifier.Hipchat({
        "room": "monitor",
        "auth_token": "__auth_token__",
        "room_token": "__room_token__",
        "mention": [
          "@rei"
        ],
        "allow": "error|info",
        "prefix": "api"
    });
}

// use
notifier.log('message');
notifier.info('message');
notifier.warn('message');
notifier.error('message');



```

## LICENSE

log-notifier is licensed under the MIT license.