/**
* This is a self-contained module that defines its routes, callbacks, models and views
* all internally. Such approach to code organization follows the recommendations of TJ:
*
* http://vimeo.com/56166857
*
*/

var app = module.exports = module.parent.exports.setAppDefaults();

// Don't just use, but also export in case another module needs to use these as well.
app.callbacks    = require('./controllers/shop');
app.models       = require('./models');

//-- For increased module encapsulation, you could also serve templates with module-local
//-- paths, but using shared layouts and partials may become tricky
//var hbs = require('hbs');
//app.set('views', __dirname + '/views');
//app.set('view engine', 'handlebars');
//app.engine('handlebars', hbs.__express);

// Module's Routes. Please note this is actually under /shop, because module is attached under /shop
app.get('/', app.callbacks.showList);

// Returns a list of all the names of lists in the database
app.get('/lists', app.callbacks.allNames);

// Create a new named list, POST { listName : String }
app.post('/lists/create', app.callbacks.createList);

// Gets the list with list = :listName
app.get('/lists/:listName', app.callbacks.findList);

// Insert item into a list, POST { items : [{
// _id: String,
// ownerPhone#: String,
// name: String,
// price: Double,
// paid: Bool}] }
app.post('/lists/:listName/addItems', app.callbacks.addItems);

// Delete items from a list, POST { idsToDelete : [_id of items to delete] }
app.post('/lists/:listName/deleteItems', app.callbacks.deleteItems);

// Delete a shopping list completely
app.post('/lists/deleteList', app.callbacks.deleteList);

// SplitBill
app.get('/lists/:listName/splitBill', app.callbacks.splitBill);

// updatePrice
app.post('/lists/:listName/updatePrice', app.callbacks.updatePrice);
