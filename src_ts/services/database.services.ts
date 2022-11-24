// External Dependencies
import * as mongoDB from "mongodb";

// Global Variables
export const client: mongoDB.MongoClient = new mongoDB.MongoClient(
  "mongodb://localhost:27017"
);
export const database = client.db("folderStructure");
export const root = database.collection("root");
