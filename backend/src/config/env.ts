import dotenv from "dotenv";

dotenv.config();

export const env = {
  databaseUrl: process.env.DATABASE_URL!,
  inventoryUrl: process.env.INVENTORY_SERVICE_URL!,
};
