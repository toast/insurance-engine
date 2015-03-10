var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static('www'));
app.use(bodyParser());

app.post('/messages', function (req, res) {
    console.log(req.body);
    res.send({text: 'ok, got it!'});
});

module.exports = app;
