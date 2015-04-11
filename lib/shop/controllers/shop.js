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
  shoppingList.all(function(result) { res.json(result); });
};

exports.createList = function(req, res) {
  shoppingList.create(req.body.listName, function(result) { res.json(result); });
};

exports.findList = function(req, res) {
  shoppingList.find(req.params.listName, function(result) { res.json(result); });
};

exports.addItems = function(req, res) {
  shoppingList.addItems(req.params.listName, req.body.items, function(result) { res.json(result); });
};

exports.deleteItems = function(req, res) {
  shoppingList.deleteItems(req.params.listName, req.body.idsToDelete, function(result) { res.json(result); });
};

exports.splitBill = function(req, res) {
  shoppingList.find(req.params.listName, function(result) {
    var bill = {};
    if (result !== null) {
      for (var i = 0; i < result.items.length; i++) {
        if (result.items[i].ownerPhone in bill) {
          bill[result.items[i].ownerPhone] += result.items[i].price;
        }
        else {
          bill[result.items[i].ownerPhone] = result.items[i].price;
        }
      }
      res.json(bill);
    } else {
      // @TODO: DO SOMETHING FOR THE ERROR
      res.send(" :( ");
    }
  });
};
