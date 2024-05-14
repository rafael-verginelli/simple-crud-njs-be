const express = require("express");
const server = express();
const connectionString =
  require("./util/database/database").databaseConnectionString;

const cors = require('cors');

const simpleCrudRouter = require("./routes/crud-routes");

const mongoose = require("mongoose");

const bodyParser = require('body-parser');

server.use(bodyParser.urlencoded({ extended: false }));
server.use(cors());

server.use(simpleCrudRouter);

server.use((req, res, next) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("<h2> Server works! </h2>");
});

mongoose
  .connect(connectionString)
  .then((result) => {
    // console.log('CONNECTED TO DB!', result);
  })
  .catch((error) => {
    console.log(error);
  });

server.listen(3000);
