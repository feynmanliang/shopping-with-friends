var ShoppingList = require('../../shop/models/shoppingList');
var request = require('request');

module.exports = function(io) {

  exports.charge = function(req, res) {
    console.log("sending Venmo charge");
    console.log({
        access_token: req.body.access_token,
        phone: req.body.phone,
        note: 'Splitting bill from ' + req.body.listName,
        amount: req.body.amt // negative to charge other user
      });


    request.post({
      url: 'https://api.venmo.com/v1/payments',
      form: {
        access_token: req.body.access_token,
        phone: req.body.phone,
        note: req.body.note,
        amount: req.body.amount // negative to charge other user
      }
    },
    function(err, httpResponse, body) {
      console.log("Successfully POSTed venmo charge:");
      console.log(body);
      res.json(httpResponse);
    });
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
