require("dotenv").config();
const express = require("express");

const cors = require("cors");
const routes = require("./src/routes");

const app = express();
const http = require("http").createServer(app);


app.use(cors());
app.use(express.json());
app.use(routes);

const port = process.env.PORT || 3333;

http.listen(port);