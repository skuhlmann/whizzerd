var express = require('express');
var app = express();

require('./routes/routes.js')(app);

app.use('/', express.static('components'));

var server = app.listen(3000, function() {
  console.log('Listening on port %s...', server.address().port);
});
