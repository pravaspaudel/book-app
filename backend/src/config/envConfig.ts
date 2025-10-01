import dotenv from "dotenv";

dotenv.config({ quiet: true });

const PORT: Number = Number(process.env.PORT);

const { MONGO_URL = " ", JWT_SECRET = " " } = process.env;

if (!PORT || !MONGO_URL || !JWT_SECRET) {
  throw new Error("something is missing");
}

export { PORT, MONGO_URL, JWT_SECRET };
