
/**
 * Module dependencies.
 */

var 
	argv = require('optimist').argv
  , express = require('express')
  , ejs = require('ejs-locals')
  , routes = require('./routes') // gets index.js by default
  , path = require('path')
  , app = express(); // create the Express object
  

// dev only
app.configure('development', function _configureDev() {
	app.use(express.logger('dev'));
});

// configure for all targets
app.configure(function _configureAll() {
  console.log('Environnment: %s', app.get('env'));
	
  // app wide vars
  app.set('ip', process.env.IP || argv.ip || 'localhost');
  app.set('port', process.env.PORT || argv.port || 3000);

  // template engine
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');

  // add .html to ejs
  app.engine('.html', ejs);

  // add less mime type
  // from: http://stackoverflow.com/questions/7109732/express-setting-content-type-based-on-path-file
  express.static.mime.define({'text/plain': ['less']});

  // middleware
  /*app.use(express.compress({
	filter: function(req, res){
		return (/json|text|javascript|less|css|txt/).test(res.getHeader('Content-Type'));
	}
  }));*/
  //app.use(express.favicon());
  //app.use(express.bodyParser()); // for JSON POSTS
  //app.use(express.methodOverride()); // for PUTS
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.errorHandler());
});

// app routes
app.get ('/', routes.index);
app.get ('/create', routes.create);

// start the server
app.listen(app.get('port'), function _serverStarted() {
  console.log("Express server listening on " + app.get('ip') + " on port " + app.get('port'));
});
