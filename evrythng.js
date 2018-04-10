module.exports = function(RED) {
  var request = require('request');

  function postEvrythng(property, value, apitoken, thng_id, timestamp) {
    request.post({
      headers : {
        'content-type' : 'application/json',
        "Authorization" : apitoken,
      },
      url : 'https://api.evrythng.com/thngs/'+thng_id+'/properties',
      body: '[{ "key" : "'+property+'", "value" : "'+value+'", "timestamp" : "'+timestamp+'"}]',
    }, function(error, response, body) {
      console.log(`evrythng\n${body}\n--------`);
    });
  }

  function EvrythngNode(n) {
    RED.nodes.createNode(this, n);

    this.on("input", function(msg) {
      var thng_id = msg.thng_id||n.thng_id;
      var property = msg.property || n.property||msg.topic;
      var value = msg.payload;
      var apitoken = msg.apitoken || n.apitoken;
      var timestamp =  msg.timestamp || Date.now();
      postEvrythng(property, value, apitoken, thng_id, timestamp);
    });
  }
  RED.nodes.registerType("evrythng", EvrythngNode);
}
