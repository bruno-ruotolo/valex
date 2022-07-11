import dotenv from "dotenv";
import pg from "pg";
dotenv.config();

const { Pool } = pg;
const dbConfig: any = ({
  connectionString: process.env.DATABASE_URL
});

if (process.env.MODE === "PROD") {
  dbConfig.ssl = {
    rejectUnauthorized: false
  }
};

export const connection = new Pool(dbConfig);