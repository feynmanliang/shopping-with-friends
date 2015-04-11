var exports = module.exports;

var shoppingList = require('../models/shoppingList');

exports.showList = function(req, res) {

  var name = req.query.name || "";

  var context = {
    siteTitle: "Collaborative Shoppnig List!",
    items: shoppingList.all
  };

  var template = __dirname + '/../views/shoppingList';
  res.render(template, context);

  // Just responding with a string, without any template:
  // res.status(200).send('Hello World');
};
