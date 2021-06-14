import express from "express";
import orderController from "../Controller/Order.controller";

const orderRouter = express.Router();

orderRouter.get("/orders", orderController.getAll);

orderRouter.post("/order/create", orderController.create);

export { orderRouter };
