var MongoClient = require("mongodb").MongoClient; // Driver for connecting to MongoDB
import { MongoClient as MongoClientType, ObjectId } from "mongodb";
let client: MongoClientType | null = null;

export async function connectDatabase() {
  // events is our database that contain both newsletter & comments collections/tables
  if (client) client.close();
  client = await MongoClient.connect(
    "mongodb+srv://user:svvhUCzOcIUyhdLD@cluster1.r2tfvft.mongodb.net/ecommerce-crown?retryWrites=true&w=majority?directConnection=true"
  ); // use %23 for !, "" for #$

  return client;
}

export async function insertData(client: MongoClientType, collection: any, document: [] | {}) {
  const db = client.db("ecommerce-crown"); // client.db('ecommerce-crown');
  const now = new Date().getTime(); // _id:now to be able to take data descending!
  const result = await db.collection(collection).insertOne({ _id: now as unknown as ObjectId, document });
  return result;
}

export async function getAllData(client: MongoClientType, collection: any, sort: any) {
  const db = client.db();
  const documents = await db.collection(collection).find().sort(sort).toArray();
  // sort = {_id: -1} descending based on _id
  return documents;
}
