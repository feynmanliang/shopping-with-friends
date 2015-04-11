var _ = require('underscore');
var util = require('util');
var db = require('mongoskin').db('mongodb://localhost:27017/shop')

function ShoppingList() {}

// Get names of all lists available
ShoppingList.prototype.all = function(resolve) {
  db.collection("shoppingLists").find().toArray(function(err, result) {
    resolve(
      _.map(result, function(x) { return x["name"]; })
    );
  });
};

// Create a named list
ShoppingList.prototype.create = function(listName, resolve) {
  // @TODO: check that the list name is unique
  db.collection("shoppingLists").insert({ name: listName, items: [] }, function(err, result) {
    resolve(result);
  });
};

// Get specific named list
ShoppingList.prototype.find = function(listName, resolve) {
  db.collection("shoppingLists").findOne( { name: listName }, function(err, result) {
    resolve(result);
  });
};

// Add items to a list
ShoppingList.prototype.addItems = function(listName, listItems, resolve) {
  db.collection("shoppingLists").update(
    { name: listName },
    { $push: { items:  { $each: listItems } } },
    function(err, result) {
      resolve(result);
    }
  );
};

// Delete items from a list
ShoppingList.prototype.deleteItems = function(listName, idsToDelete, resolve) {
  console.log("deleting items from ");
  console.log(listName);
  console.log("with ids in ");
  console.log(idsToDelete);
  db.collection("shoppingLists").update(
    { name: listName },
    { $pull: { items:  { _id: { $in: idsToDelete } } } },
    function(err, result) {
      resolve(result);
    }
  );
};

module.exports = new ShoppingList();
