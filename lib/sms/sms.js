/**
* This is a self-contained module that defines its routes, callbacks, models and views
* all internally. Such approach to code organization follows the recommendations of TJ:
*
* http://vimeo.com/56166857
*
*/

module.exports = function(io) {
  var app = module.parent.exports.setAppDefaults();

  io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
      console.log('a user disconnected')
    })
  });

  // Don't just use, but also export in case another module needs to use these as well.
  app.callbacks    = require('./controllers/twilio')(io);
  app.models       = require('./models');

  //-- For increased module encapsulation, you could also serve templates with module-local
  //-- paths, but using shared layouts and partials may become tricky
  //var hbs = require('hbs');
  //app.set('views', __dirname + '/views');
  //app.set('view engine', 'handlebars');
  //app.engine('handlebars', hbs.__express);

  // Sends a message using twilio
  // POST {
  //  to: String (PhoneNumber)
  //  body: String
  // }
  app.post('/send', app.callbacks.send);

  // Twilio will post here on message receipt
  app.post('/receive', app.callbacks.receive);

  return app;
}
