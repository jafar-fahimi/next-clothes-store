var MongoClient = require("mongodb").MongoClient; // Driver for connecting to MongoDB
import { MongoClient as MongoClientType, ObjectId } from "mongodb";
let client: MongoClientType | null = null;

export async function connectDatabase(mongodbUriString: string) {
  // events is our database that contain both newsletter & comments collections/tables
  if (client) client.close();
  client = await MongoClient.connect(mongodbUriString); // use %23 for !, "" for #$
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
  const documents = await db.collection(collection).find().sort(sort).limit(1).toArray();
  // sort = {_id: -1} descending based on _id // .limit(1) only takes the last data!
  return documents;
}
