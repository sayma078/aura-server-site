const express = require("express");
const app = express();
const { MongoClient } = require('mongodb');

const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.31irp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// console.log(uri)

app.get("/", (req, res) => {
    res.send("Running Aura Server");
  });

  app.listen(port, () => {
    // console.log(`Example app listening at http://localhost:${port}`);
    console.log("Running Aura on port", port);
  });