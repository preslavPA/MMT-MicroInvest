const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');

const app = express();

//CORS SUPPORT
var allowCrossDomain = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  }
  else {
    next();
  }

};
app.use(allowCrossDomain);

//Add Middleware necessary for REST API's
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

//Connect to MongoDB

mongoose.connect('mongodb://localhost/db');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

mongoose.connection.once('open', function () {

  //Load models
  console.log('Loading models from [/models]...');
  app.models = require('./models/index');
  console.log('models loaded');
  //Load routes
  console.log('Loading routes from [/routes]');
  var routes = require('./routes');
  _.each(routes, function (controller, route) {
    app.use(route, controller(app, route));
  });

  console.log('Listening on port 4000...');
  app.listen(4000);
});