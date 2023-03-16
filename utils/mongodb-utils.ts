// var MongoClient = require("mongodb").MongoClient; // Driver for connecting to MongoDB
import { MongoClient, ObjectId } from "mongodb";
let myMongoClient: MongoClient | null = null;

export async function connectDatabase(mongodbUri: string) {
  // events is our database that contain both newsletter & comments collections/tables
  if (myMongoClient) return myMongoClient; // connection is finite!
  // client = await MongoClient.connect(mongodbUri); // use %23 for !, "" for #$
  myMongoClient = await new MongoClient(mongodbUri).connect(); // use %23 for !, "" for #$
  return myMongoClient;
}

export async function insertData(client: MongoClient, collection: string, document: [] | {}) {
  const db = client.db("ecommerce-crown"); // client.db('ecommerce-crown');
  const now = new Date().getTime(); // _id:now to be able to take data descending!
  const result = await db.collection(collection).insertOne({ _id: now as unknown as ObjectId, document });
  return result;
}

export async function getAllData(client: MongoClient, collection: string, sort: any) {
  const db = client.db();
  const documents = await db.collection(collection).find().sort(sort).limit(1).toArray();
  // sort = {_id: -1} descending based on _id // .limit(1) only takes the last data!
  return documents;
}
