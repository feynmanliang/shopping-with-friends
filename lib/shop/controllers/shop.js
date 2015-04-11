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
};

exports.allNames = function(req, res) {
  shoppingList.all(function(items) { res.json(items) });
};

exports.createList = function(req, res) {
  shoppingList.create(req.body.listName, function(items) { res.json(items) });
};

exports.findList = function(req, res) {
  shoppingList.find(req.params.listName, function(items) { res.json(items) });
};

exports.addItem = function(req, res) {
  shoppingList.find(req.params.listName, function(items) { res.json(items) });
};
