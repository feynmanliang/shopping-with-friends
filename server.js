require('dotenv').load();
var server = require('nodebootstrap-server');

server.setup(function(runningApp, http) {

  // runningApp.use(require('express-session')({secret: CONF.app.cookie_secret, resave: false, saveUninitialized: false}));

  //---- Mounting well-encapsulated application modules
  //---- See: http://vimeo.com/56166857

  var io = require('socket.io')(http);

  runningApp.use('/sms', require('sms')(io)); // attach to sub-route
  runningApp.use('/shop', require('shop')); // attach to sub-route
  runningApp.use('/payments', require('payments')(io)); // attach to sub-route
  runningApp.use(require('routes')); // attach to root route

});
