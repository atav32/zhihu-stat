
/**
 * Module dependencies
 */

var express = require('express');
var routes = require('./routes');
var api = require('./routes/api');
var http = require('http');
var path = require('path');
var mongo = require('mongodb');
var monk = require('monk');
var stringFormat = require('string-format');
var db = monk('localhost:27017/zhihuUsers');
var username = db.get('usernames');

var app = module.exports = express();

/**
* Configuration
*/

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, '/public')));
app.use(app.router);

// development only
if (app.get('env') === 'development') {
   app.use(express.errorHandler());
};

// production only
if (app.get('env') === 'production') {
  // TODO
}; 


// Routes
app.get('/', routes.index);

// JSON API
app.get('/api/zhihuUser', api.zhihuUser);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

/**
* Start Server
*/

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
