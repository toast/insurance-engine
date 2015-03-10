var express = require('express');
var bodyParser = require('body-parser');
var engine = require('./app/engine');
var app = express();

app.use(express.static('www'));
app.use(bodyParser.json());

app.post('/messages', function (req, res) {
    console.log('message request body: ' + JSON.stringify(req.body));
    var result = engine.process(req.body);
    res.json(result);
});

module.exports = app;
