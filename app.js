var express = require('express');
var app = express();

app.use(express.static('www'));
app.post('/messages', function (req, res) {
    res.send({text: 'ok, got it!'});
});

module.exports = app;
