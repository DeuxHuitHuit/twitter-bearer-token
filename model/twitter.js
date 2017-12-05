var httpRequest = require('./http');

module.exports = {
	
	createToken: function (consumerKey, consumerSecret, cb) {
		var basic = new Buffer(consumerKey + ':' + consumerSecret).toString('base64');
		
		httpRequest({
			hostname: 'api.twitter.com',
			path: '/oauth2/token',
			verb: 'POST',
			visitReq: function (req) {
				req.write('grant_type=client_credentials');
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
				'Authorization': 'Basic ' + basic
			},
			callback: cb
		});
	}
};
