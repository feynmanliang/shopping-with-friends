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
      if (err) throw err;
      // Return the updated list
      db.collection("shoppingLists").findOne( { name: listName }, function(err, result) {
        resolve(result);
      });
    }
  );
};

// Delete items from a list
ShoppingList.prototype.deleteItem = function(listName, itemId, resolve) {
  db.collection("shoppingLists").update(
    { name: listName },
    { $pull: { items:  { _id: itemId } } },
    function(err, result) {
      if (err) throw err;
    }
  );

  // Return the updated list
  db.collection("shoppingLists").findOne( { name: listName }, function(err, result) {
    resolve(result);
  });
};

// Delete a shopping list completely
ShoppingList.prototype.deleteList = function(listName, resolve) {
  db.collection("shoppingLists").remove( { name: listName }, function(err, result) {
    if (err) throw err;
  });
  resolve("OK");
};

// Update item price
ShoppingList.prototype.updatePrice = function(listName, itemToUpdate, newPrice, resolve) {
  db.collection("shoppingLists").update({
    "name" : listName,
    "items" : { $elemMatch: { "_id" : itemToUpdate } }
  }, {
    $set : {"items.$.price": parseFloat(newPrice) }
  }, function(err, res) {
    resolve(res);
  });
};

// Update items transaction status
ShoppingList.prototype.updateTransactionStatus = function(ownerPhone, newStatus, resolve) {
  db.collection("shoppingLists").update({
    // TODO: This will update EVERY TRANSACTION BELONGING TO THE USER!!
    //"name" : listName,
    "items" : { $elemMatch: { "ownerPhone" : ownerPhone } }
  }, {
    $set : {"items.$.transactionStatus": newStatus }
  }, function(err, res) {
    resolve(res);
  });
};

module.exports = new ShoppingList();
