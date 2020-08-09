import express from "express";
const server = express();
const mongoose = require("mongoose");
import routes from "./routes";
import cors from "cors";
require('dotenv').config();


mongoose.connect(process.env.URL_MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


server.use(cors())
server.use(express.json());
server.use(routes);

server.listen(3333, () => {
  console.log("Server listening on http://localhost:3333");
});
