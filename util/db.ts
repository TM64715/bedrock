import { MongoClient, Db } from 'mongodb';

const MONGODB_URI = process.env.APP_DB_URI;
const MONGODB_DB = process.env.APP_NS;
let connections = 0;
if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local',
  );
}

if (!MONGODB_DB) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local',
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongo;

if (!cached) {
  global.mongo = { conn: null, promise: null };
  cached = global.mongo;
}
// eslint-disable-next-line import/prefer-default-export
// eslint-disable-next-line import/prefer-default-export
export async function connectToDatabase():Promise<{db: Db, client: MongoClient}> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = MongoClient.connect(MONGODB_URI).then((client) => {
      connections += 1;
      console.warn('Connections', connections);
      return {
        client,
        db: client.db(process.env.APP_NS),
      };
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (err) {
    console.error(err);
  }
  return cached.conn;
}
