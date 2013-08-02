/*
 * Routes
 */
 
var twitter = require('../model/twitter.js');

module.exports = {
	index: function(req, res, next) {
		res.render('index', {
			title : 'Twitter bearer token creator'
		});
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
	}
};