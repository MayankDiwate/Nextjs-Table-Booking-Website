import { MongoClient } from "mongodb";

const uri = process.env.NEXT_PUBLIC_MONGO_URI as string;
const options = {};

if (!uri) {
  throw new Error(
    "NEXT_PUBLIC_MONGO_URI is not defined. Check your environment variables."
  );
}

const client: MongoClient = new MongoClient(uri, options);
const clientPromise: Promise<MongoClient> = client.connect();

export default clientPromise;
