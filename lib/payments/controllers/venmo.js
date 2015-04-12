module.exports = function(io) {

  exports.charge = function(req, res) {
    console.log("sending Venmo charge");
    console.log(req.body);

    // @TODO: Send charge to venmo (can we do this on frontend?)
  };

  exports.webhook = function(req, res) {
    console.log('Received venmo POST:' + JSON.stringify(req.body));

    // @TODO: emit and update frontend, set item status to paid on backend

    //io.emit('venmo recv', data, { for: 'everyone' });
    res.send(req.query.venmo_challenge);
  };

  return exports;
}
