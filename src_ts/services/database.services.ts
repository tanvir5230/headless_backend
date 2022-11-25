// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();

// Global Variables
export const client: mongoDB.MongoClient = new mongoDB.MongoClient(
  process.env.DB_CONN_STRING || ""
);
export const database = client.db(process.env.DB_NAME || "");
export const root = database.collection(process.env.FOLDER_COLLECTION || "");
