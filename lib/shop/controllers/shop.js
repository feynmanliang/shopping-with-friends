var exports = module.exports;
var shoppingList = require('../models/shoppingList');

exports.showList = function(req, res) {

  var name = req.query.name || "";

  var context = {
    siteTitle: "Collaborative Shoppnig List!",
  };

  var template = __dirname + '/../views/shoppingList';
  res.render(template, context);

  // Just responding with a string, without any template:
  // res.status(200).send('Hello World');
};

exports.allNames = function(req, res) {
  shoppingList.all(function(items) { res.json(items) });
};

exports.find = function(req, res) {
  shoppingList.find(req.params.listName, function(items) { res.json(items) });
};
