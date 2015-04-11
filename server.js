var server = require('nodebootstrap-server');
require('dotenv').load();

server.setup(function(runningApp) {

  // runningApp.use(require('express-session')({secret: CONF.app.cookie_secret, resave: false, saveUninitialized: false}));

  //---- Mounting well-encapsulated application modules
  //---- See: http://vimeo.com/56166857

  runningApp.use('/sms', require('sms')); // attach to sub-route
  runningApp.use('/shop', require('shop')); // attach to sub-route
  runningApp.use(require('routes')); // attach to root route

});
