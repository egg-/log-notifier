/**
 * notifier.js: notifier
 */

'use strict';

/**
 * notifier
 * @namespace notifier
 */
var notifier = {};


/**
 * extended console
 * logging with current date time
 *
 * @name notifier.Logger
 * @class
 * @param {object} [config] config 
 * @param {string} [config.prefix] prefix string
 * @param {string} [config.format] print date format
 * @example
 * var notifier = new Notifier.Logger();
 * var notifier = new Notifier.Logger({
 * 	prefix: 'hostname',
 * 	format: 'lll'
 * });
 *
 * notifier.log('message');
 * notifier.info('message');
 * notifier.warn('message');
 * notifier.error(message');
 */
notifier.Logger = function(config) {
	var _this = {};
	var moment = require('moment');

	if (typeof config === 'undefined') {
		config = {
			prefix: '',
			format: 'lll'
		};
	} else if (typeof config.format === 'undefined') {
		config.format = '';
	}

	/**
	 * define public method for logging
	 */
	
	/**
	 * For general output of logging information.
	 * @method log
	 * @memberOf notifier.Logger.prototype
	 * @param {...object} msg 
	 */
	/**
	 * Informatitve logging information.
	 * @method info
	 * @memberOf notifier.Logger.prototype
	 * @param {...object} msg 
	 */
	/**
	 * Outputs a warning message.
	 * @method warn
	 * @memberOf notifier.Logger.prototype
	 * @param {...object} msg 
	 */
	/**
	 * Outputs an error message
	 * @method error
	 * @memberOf notifier.Logger.prototype
	 * @param {...object} msg 
	 */
	var names = ['log', 'info', 'warn', 'error'];
	for (var k in names) {
		_this[names[k]] = (function(type) {
			return function() {
				var args = Array.prototype.slice.call(arguments);

				args.unshift(config.prefix);
				args.unshift('[' + moment().format(config.format) + ']');

				return console[type].apply(console.log, args);
			};
		})(names[k]);
	}

	return _this;
};

/**
 * notify by hipchat 
 * 
 * @class
 * @name  notifier.Hipchat
 * @param {object} config config 
 * @param {string} config.room room name
 * @param {string} config.auth_token auth_token
 * @param {string} config.room_token room_token
 * @param {array} config.metion metion list for error message.
 * @param {string} [config.prefix] prefix string
 * @example
 * var notifier = new Notifier.Hipchat({
    "room": "monitor",
    "auth_token": "__auth_token__",
    "room_token": "__room_token__",
    "mention": [
      "@rei"
    ],
    "allow": "error|info",
    "prefix": "api"
});
 */
notifier.Hipchat = function(config) {
	var _this = {};

	var hipchatter = require('hipchatter');
	var crypto = require('crypto');

	var _COLOR = {
		log: 'gray',
		info: 'green',
		warn: 'yellow',
		error: 'red'
	};

	// ignore duplicated message
	var _filter = {};

	var _config = config;
	var _client = new hipchatter(_config.auth_token);

	/**
	 * make identifier string
	 * @param  {object} message 
	 * @return {string}
	 */
	var _makeIdentifier = function(message) {
		return crypto.createHash('sha1').update(message.toString()).digest('hex');
	};

	/**
	 * check whether duplicated message.
	 * @param  {object} message
	 * @return {boolean | integer} whether duplicated
	 */
	var _check = function(message) {
		var identifier = _makeIdentifier(message);
		if (typeof _filter[identifier] !== 'undefined' && _filter[identifier] < ((+new Date()) + 10 * 60000)) {
			console.error('duplicated error', identifier, message);
			return _filter[identifier];
		}

		_filter[identifier] = +new Date();
		return false;
	};

	/**
	 * notify message
	 * @param  {string} type    message type
	 * @return {object}         instance
	 */
	var _notify = function() {
		var args = Array.prototype.slice.call(arguments);
		var type = args.shift();
		var message = args.shift();

		if (_config.allow.indexOf(type) === -1) {
			return true;
		}

		if (type === 'error') {
			// only one notify error message.
			if (_check(message) !== false) {
				return _this;
			}

			message = _config.mention.join(' ') + ' ' + message;
		}

		args.unshift(message);
		args.unshift(_config.prefix);

		_client.notify(_config.room, {
			message: args.join("\n"),
			token: _config.room_token,
			notify: true,
			message_format: 'text',
			color: _COLOR[type || 'info']
		}, function(err) {
			if (err !== null) {
				console.error(err);
			}
		});

		return _this;
	};

	/**
	 * define public method for logging
	 */
	/**
	 * For general output of logging information.
	 * @method log
	 * @memberOf notifier.Hipchat.prototype
	 * @param {...object} msg 
	 */
	/**
	 * Informatitve logging information.
	 * @method info
	 * @memberOf notifier.Hipchat.prototype
	 * @param {...object} msg 
	 */
	/**
	 * Outputs a warning message.
	 * @method warn
	 * @memberOf notifier.Hipchat.prototype
	 * @param {...object} msg 
	 */
	/**
	 * Outputs an error message
	 * @method error
	 * @memberOf notifier.Hipchat.prototype
	 * @param {...object} msg 
	 */
	var names = ['log', 'info', 'warn', 'error'];
	for (var k in names) {
		_this[names[k]] = (function(type) {
			return function() {
				var args = Array.prototype.slice.call(arguments);
				args.unshift(type);
				return _notify.apply(_this, args);
			};
		})(names[k]);
	}

	return _this;
};


module.exports = notifier;
