import mongoose from "mongoose";
const uri =
  "mongodb+srv://ilham:hjN17R27XxFRJ7Iv@cluster0.gr0qp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.Promise = Promise;

mongoose.connection.on("connected", () => {
  console.log("MongoDB Connection Established");
});

mongoose.connection.on("reconnected", () => {
  console.log("MongoDB Connection Reestablished");
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB Connection Disconnected");
});

mongoose.connection.on("close", () => {
  console.log("MongoDB Connection Closed");
});

mongoose.connection.on("error", (error) => {
  console.log("MongoDB ERROR: " + error);
  process.exit(1);
});

const connectMongo = async () => {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
};

export default connectMongo;
