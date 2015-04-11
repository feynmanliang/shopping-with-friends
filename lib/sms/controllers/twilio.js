var exports = module.exports;
var client= require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

var twilioMagicNum = "+15005550006";
var fromNum = "+15086845012";

exports.send = function(req, res) {
  console.log("sending SMS");
  console.log(req.body);
  client.sendMessage({
    to: req.body.to,
    from: twilioMagicNum,
    body: req.body.body
  }, function(err, responseData) {
    if (!err) res.json(responseData);
    else console.log(err);
  });
};

exports.receive = function(req, res) {
};
