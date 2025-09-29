import dotenv from "dotenv";

dotenv.config({ quiet: true });

const PORT: Number = Number(process.env.PORT);
const MONGO_URL: string = process.env.MONGO_URL ?? "";

if (!PORT || !MONGO_URL) {
  throw new Error("something is missing");
}

export { PORT, MONGO_URL };
