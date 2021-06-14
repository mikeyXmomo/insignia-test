const { Order } = require("../Schema/Order.schema");
const { v4: uuidv4 } = require("uuid");

exports.getAll = async (req, res) => {
  try {
    const allOrder = await Order.find().sort({ createdAt: -1 }).exec();
    return res.status(200).json({ data: allOrder });
  } catch (error) {
    return res.status(500).send({ data: error });
  }
};

exports.create = async (req, res) => {
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
