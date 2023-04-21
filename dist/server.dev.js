"use strict";

var express = require('express');

var db = require('./config/connection');

var routes = require('./routes');

var PORT = process.env.PORT || 3001;
var app = express();
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(routes);
db.once('open', function () {
  app.listen(PORT, function () {
    console.log("API server running on port http://127.0.0.1:".concat(PORT));
  });
});
//# sourceMappingURL=server.dev.js.map
