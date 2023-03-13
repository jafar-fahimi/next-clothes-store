// var MongoClient = require("mongodb").MongoClient; // Driver for connecting to MongoDB
import { MongoClient as MongoClientType, ObjectId } from "mongodb";
let mongoClient: MongoClientType | null = null;

export async function connectDatabase(mongodbUriString: string) {
  // events is our database that contain both newsletter & comments collections/tables
  if (mongoClient) return mongoClient; // connection is finite!
  // client = await MongoClient.connect(mongodbUriString); // use %23 for !, "" for #$
  mongoClient = await new MongoClientType(mongodbUriString).connect(); // use %23 for !, "" for #$
  return mongoClient;
}

export async function insertData(client: MongoClientType, collection: string, document: [] | {}) {
  const db = client.db("ecommerce-crown"); // client.db('ecommerce-crown');
  const now = new Date().getTime(); // _id:now to be able to take data descending!
  const result = await db.collection(collection).insertOne({ _id: now as unknown as ObjectId, document });
  return result;
}

export async function getAllData(client: MongoClientType, collection: string, sort: any) {
  const db = client.db();
  const documents = await db.collection(collection).find().sort(sort).limit(1).toArray();
  // sort = {_id: -1} descending based on _id // .limit(1) only takes the last data!
  return documents;
}

/*
var MongoClient = require("mongodb").MongoClient; // Driver for connecting to MongoDB
import { MongoClient as MongoClientType, ObjectId } from "mongodb";

let clientPromise: any;
let client: MongoClientType | null = null;

export async function connectDatabase(mongodbUriString: string) {
  if (!mongodbUriString) throw new Error("Please add your MONGODB_URI!");
  if (process.env.NODE_ENV === "development") {
    // global values is preserved through module reloads because of HMR(hot-module-replacement)
    if (!global._mongoClientPromise) {
      client = await new MongoClientType(mongodbUriString);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  }
  // events is our database that contain both newsletter & comments collections/tables
  // if (clientPromise) {
  // connection qty is finite!
  // return clientPromise;
  // client.close();
  // }
  // client = await MongoClient.connect(mongodbUriString); // use %23 for !, "" for #$
  else {
    client = await new MongoClient(mongodbUriString);
    clientPromise = client?.connect();
  }
  console.log("just connected to mongodb.");
  return clientPromise;
}
*/
