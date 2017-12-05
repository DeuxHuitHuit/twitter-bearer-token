'use strict';

/**
 * Module dependencies.
 */

const argv = require('optimist').argv;
const express = require('express');
const ejs = require('ejs-locals');
const routes = require('./routes'); // gets index.js by default
const path = require('path');
const app = express(); // create the Express object

// dev only
if (app.settings.env === 'development') {
  app.use(require('morgan')('combined'));
}

// configure for all targets
console.log('Environnement: %s', app.settings.env);
// app wide vars
app.set('ip', process.env.IP || argv.ip || 'localhost');
app.set('port', process.env.PORT || argv.port || 3000);

// template engine
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

// add .html to ejs
app.engine('.html', ejs);

app.use(express.static(path.join(__dirname, 'public')));
app.use(require('errorhandler')());

// app routes
app.get ('/', routes.index);
app.get ('/create', routes.create);

// start the server
app.listen(app.get('port'), function _serverStarted() {
  console.log("Express server listening on " + app.get('ip') + " on port " + app.get('port'));
});
