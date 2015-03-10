var express = require('express');
var bodyParser = require('body-parser');
var engine = require('./app/engine');
var app = express();

app.use(express.static('www'));
app.use(bodyParser());

app.post('/messages', function (req, res) {
    var result = engine.process(req.body);
    res.send(result);
});

module.exports = app;
