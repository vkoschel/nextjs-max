import { MongoClient } from "mongodb";

import { USER, PASS } from "../config";

export async function connectDb() {
  const client = await MongoClient.connect(
    `mongodb+srv://${USER}:${PASS}@cluster0.l3f7b.mongodb.net/events?retryWrites=true&w=majority`
  );
  return client;
}

export async function insertDoc(client, collection, document) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function getAllDocs(client, collection, sort) {
  const db = client.db();

  const documents = await db.collection(collection).find().sort(sort).toArray();

  return documents;
}
