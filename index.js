var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var jsonSchema = require('jsonschema');
var nodemailer = require('nodemailer');

// Define some default values if not set in environment
var PORT = process.env.PORT || 3000;
var SHUTDOWN_TIMEOUT = process.env.SHUTDOWN_TIMEOUT || 10000;
var SERVICE_CHECK_HTTP = process.env.SERVICE_CHECK_HTTP || '/healthcheck';

// Create a new express app
var app = express();

app.use(bodyParser.json());

// Add CORS headers
app.use(cors());

var transporter = nodemailer.createTransport();

// Add health check endpoint
app.get(SERVICE_CHECK_HTTP, function (req, res) {
  res.send({ message: 'OK' });
});

app.post('/notification/order', function (req, res) {
  var jsonBody = req.body;
  
  transporter.sendMail({
      from: 'devspace2015@codershell.org',
      to: 'devspace2015@codershell.org',
      subject: 'new order received',
      text: JSON.stringify(jsonBody)
  });
  
  res.status(201).end();
});



// Start the server
var server = app.listen(PORT);

console.log('Service listening on port %s ...', PORT);




////////////// GRACEFUL SHUTDOWN CODE ////

var gracefulShutdown = function () {
  console.log('Received kill signal, shutting down gracefully.');

  // First we try to stop the server smoothly
  server.close(function () {
    console.log('Closed out remaining connections.');
    process.exit();
  });

  // After SHUTDOWN_TIMEOUT we will forcefully kill the process in case it's still running
  setTimeout(function () {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit();
  }, SHUTDOWN_TIMEOUT);
};

// listen for TERM signal .e.g. kill
process.on('SIGTERM', gracefulShutdown);

// listen for INT signal e.g. Ctrl-C
process.on('SIGINT', gracefulShutdown);
