var ShoppingList = require('../../shop/models/shoppingList');

module.exports = function(io) {

  exports.charge = function(req, res) {
    console.log("sending Venmo charge");
    console.log(req.body);

    // @TODO: Send charge to venmo (can we do this on frontend?)
  };

  exports.verify = function(req, res) {
    res.send(req.query.venmo_challenge);
  };

  exports.webhook = function(req, res) {
    var reqData = req.body.data;
    console.log('Received venmo POST:' + JSON.stringify(req.body.data));

    var ownerPhone = req.body.data.target.phone;
    var newStatus = req.body.data.status;
    ShoppingList.updateTransactionStatus(
      ownerPhone,
      newStatus,
      function(res) {
        console.log("Succesfully updated transaction status in DB");
        console.log(res);
      }
    );
    io.emit('venmo recv', {
      ownerPhone: ownerPhone,
      newStatus: newStatus},
      { for: 'everyone' });
    res.sendStatus(200);
  };

  return exports;
}
