const express = require("express");
const { getAll, create } = require("../Controller/Order.controller");

const orderRouter = express.Router();

orderRouter.get("/orders", getAll);

orderRouter.post("/order/create", create);

module.exports = orderRouter;
