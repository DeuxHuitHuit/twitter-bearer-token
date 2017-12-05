'use strict';
/**
 * Routes
 */

var twitter = require('../model/twitter.js');
var instagram = require('../model/instagram.js');

var defaults = {
	title : 'Twitter bearer token creator',
	code: null,
	year: (new Date()).getFullYear()
};

module.exports = {
	index: function(req, res, next) {
		res.render('index', defaults);
	},
	create: function(req, res, next) {
		if (!req.query.key || !req.query.secret) {
			res.json({
				ok: false,
				err: 'Both key and secret are required'
			});
		} else {
			twitter.createToken(req.query.key, req.query.secret, function (err, data) {
				res.json({
					ok: !err,
					err: err,
					data: data
				});
			});
		}
	},
	instagramCode: function (req, res, next) {
		if (!req.body.key && !req.body.secret) {
			res.json({
				ok: false,
				err: 'Key or secret is required'
			});
		} else if (!!req.body.secret) {
			if (!req.body.code) {
				res.json({
					ok: false,
					err: 'Code is required with secret'
				});
			} else {
				instagram.createToken(
					req.body.key,
					req.body.secret,
					req.app.get('host') + '/instagram/token',
					req.body.code,
					req.body.scope,
					function (err, data) {
						if (!!err) {
							throw err;
						}
						res.json(data);
					}
				);
			}
		} else {
			res.redirect(instagram.requestCode(
				req.body.key,
				req.app.get('host') + '/instagram/token',
				null,
				req.body.scope
			));
		}
	},
	instagramToken: function (req, res, next) {
		if (!req.query.code) {
			res.json({
				ok: false,
				err: 'Code is required'
			});
		} else {
			res.render('index', {
				title : 'Twitter bearer token creator',
				code: req.query.code
			});
		}
	}
};
