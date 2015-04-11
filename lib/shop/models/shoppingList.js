var _ = require('underscore');
var util = require('util');
var db = require('mongoskin').db('mongodb://localhost:27017/shop')

function ShoppingList() {}

//ShoppingList.prototype.welcomeMessage = function(argName) {
  //var name = argName || "Stranger";
  //return util.format('Hello %s! Welcome to NodeBootstrap!', name);
//};

// Typical CRUD

ShoppingList.prototype.all = function(resolve) {
  db.collection("shoppingLists").find().toArray(function(err, result) {
    resolve(
      _.map(result, function(x) { console.log(x); return x["name"]; })
    );
  });
};

ShoppingList.prototype.find = function(listName, resolve) {
  console.log(listName);
  // @TODO: Assumes uniqueness of listName
  db.collection("shoppingLists").findOne( { "name": listName }, function(err, result) {
    resolve(result);
  });
};

ShoppingList.prototype.save = function() {
  // @TODO
};

ShoppingList.prototype.delete = function() {
  // @TODO
};

module.exports = new ShoppingList();
