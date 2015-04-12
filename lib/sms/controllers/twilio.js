module.exports = function(io) {
  var client= require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  var fromNum = "+15086845012";


  exports.send = function(req, res) {
    console.log("sending SMS");
    console.log(req.body);
    client.sendMessage({
      to: req.body.to,
      from: fromNum,
      body: req.body.body
    }, function(err, responseData) {
      if (!error) {
        console.log('Success! The SID for this SMS message is:');
        console.log(message.sid);

        console.log('Message sent on:');
        console.log(message.dateCreated);
      } else {
        console.log('Oops! There was an error.');
      }
    });
  };

  exports.receive = function(req, res) {
    var data = {
      'from' : req.body.From,
      'items' : req.body.Body
    };
    console.log('Received SMS:' + JSON.stringify(data));
    io.emit('sms recv', data, { for: 'everyone' });
    res.sendStatus(200);
  };

  return exports;
}
