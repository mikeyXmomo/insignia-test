const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const orderRouter = require("./Routes/Order.routes");
const compression = require("compression");
const { uri } = require("./Database/Connection");

const app = express();

app.use(express.json());
app.use(cors());
app.use(compression());

mongoose.connect(uri, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

app.use(orderRouter);

app.listen(8000, () => console.log("🚀 Server Started on Port 8000"));
