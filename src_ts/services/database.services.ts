// External Dependencies
import * as mongoDB from "mongodb";
// import * as dotenv from "dotenv";

// Global Variables
const client: mongoDB.MongoClient = new mongoDB.MongoClient(
  "mongodb://localhost:27017"
);
const db: mongoDB.Db = client.db("folderStructure");
const collection: mongoDB.Collection = db.collection("root");
