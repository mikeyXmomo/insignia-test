import { Order } from "../Schema/Order.schema";
import { v4 as uuidv4 } from "uuid";

const orderController = {};

orderController.getAll = async (req, res) => {
  try {
    const allOrder = await Order.find().sort({ createdAt: -1 }).exec();
    return res.status(200).json({ data: allOrder });
  } catch (error) {
    return res.status(500).send({ data: error });
  }
};

orderController.create = async (req, res) => {
  const { invoiceNumber, email, paymentStatus, fulfillmentStatus, total } =
    req.body;
  try {
    const newOrder = await Order.create({
      id: uuidv4(),
      invoiceNumber,
      email,
      paymentStatus,
      fulfillmentStatus,
      total,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    if (newOrder) {
      return res.status(200).send({ data: newOrder });
    }
    return res.status(500).send({ data: newOrder });
  } catch (error) {
    return res.status(500).send({ data: error });
  }
};

export default orderController;
