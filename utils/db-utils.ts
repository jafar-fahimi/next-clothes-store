import { MongoClient } from "mongodb";

export async function connectDatabase() {
  // events is our database that contain both newsletter & comments collections/tables
  const client = await MongoClient.connect(
    "mongodb+srv://user-1:abc123!@#@cluster1.r2tfvft.mongodb.net/ecommerce-crown?retryWrites=true&w=majority"
  );
  return client;
}

export async function insertData(client: MongoClient, collection: any, document: Object) {
  const db = client.db(); // // client.db('ecommerce-crown');
  const result = await db.collection(collection).insertOne(document);
  // client.close(); // optional maybe
  return result;
}

export async function getAllData(client: MongoClient, collection: any, sort: any) {
  const db = client.db();
  const documents = await db.collection(collection).find().sort(sort).toArray();
  // sort = {_id: -1} descending based on _id
  // client.close(); // optional maybe
  return documents;
}
