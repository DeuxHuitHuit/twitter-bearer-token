var http = require('https');

module.exports = function (options) {

	options.callback = options.callback || function () {};

	var req = http.request({
			hostname: 'api.twitter.com',
			port: 443,
			path: options.path,
			method: options.verb || 'GET',
			headers: options.headers
		}, function (res) {
			var buffer = '';
			
			res.setEncoding('utf8');
			
			//console.log(res.statusCode);
			//console.dir(res.headers);
			
			res.on('data', function(d) {
				buffer += d;
			});
			
			res.on('end', function (d) {
				//process.stdout.write(buffer);
				options.callback(null, JSON.parse(buffer));
			});
		});
	
	if (!!options.visitReq) {
		options.visitReq(req);
	}
	
	req.end();
	
	req.on('error', function(e) {
		console.error(e);
		options.callback(e);
	});

};