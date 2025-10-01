import express from "express";
import { PORT, MONGO_URL } from "./config/envConfig";
import connectDB from "./db/connectDb";
import errorHandler from "./middlewares/errorHandler";
import authRoute from "./routes/authRoute";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoute);

app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(MONGO_URL);

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log(`Error in connecting to db : ${err}`);
  }
};

start();
