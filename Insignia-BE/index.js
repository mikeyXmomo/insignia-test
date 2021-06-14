import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectMongo from "./Database/Connection";
import { orderRouter } from "./Routes/Order.routes";
import compression from "compression";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(compression());

connectMongo();

app.use(orderRouter);

app.listen(8000, () => console.log("🚀 Server Started on Port 8000"));
