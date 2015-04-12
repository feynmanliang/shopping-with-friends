/**
* This is a self-contained module that defines its routes, callbacks, models and views
* all internally. Such approach to code organization follows the recommendations of TJ:
*
* http://vimeo.com/56166857
*
*/

module.exports = function(io) {
  var app = module.parent.exports.setAppDefaults();

  // Don't just use, but also export in case another module needs to use these as well.
  app.callbacks    = require('./controllers/venmo')(io);
  app.models       = require('./models');

  //-- For increased module encapsulation, you could also serve templates with module-local
  //-- paths, but using shared layouts and partials may become tricky
  //var hbs = require('hbs');
  //app.set('views', __dirname + '/views');
  //app.set('view engine', 'handlebars');
  //app.engine('handlebars', hbs.__express);

  // Send charges through to venmo
  app.post('/charge', app.callbacks.charge);

  // Venmo webhook for responses
  app.get('/webhook', app.callbacks.webhook);

  return app;
}
