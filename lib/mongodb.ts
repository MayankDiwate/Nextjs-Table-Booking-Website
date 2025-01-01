import { MongoClient } from "mongodb";

const uri = process.env.NEXT_PUBLIC_MONGO_URI as string;
const options = {};

if (!uri) {
  throw new Error("NEXT_PUBLIC_MONGO_URI is not defined. Check your environment variables.");
}

// declare global {
//   let _mongoClientPromise: Promise<MongoClient> | undefined;
// }

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
