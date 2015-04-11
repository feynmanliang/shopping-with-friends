var util = require('util');
var db = require('mongoskin').db('mongodb://localhost:27017/shop')

function ShoppingList() {}

//ShoppingList.prototype.welcomeMessage = function(argName) {
  //var name = argName || "Stranger";
  //return util.format('Hello %s! Welcome to NodeBootstrap!', name);  
//};

// Typical CRUD

ShoppingList.prototype.all = function() {
  return db.collection("shoppingLists").find().toArray(function(err, res) {
    if (err) throw err;
    console.log(res);
    return res;
  });
};

ShoppingList.prototype.find = function(id) {
  // @TODO
};

ShoppingList.prototype.save = function() {
  // @TODO
};

ShoppingList.prototype.delete = function() {
  // @TODO
};

module.exports = new ShoppingList();
