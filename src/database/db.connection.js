import pg from "pg";
import dotenv from 'dotenv';
dotenv.config()

const { Pool } = pg;

const dbConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
}

export const dbmaster = new Pool(dbConfig);