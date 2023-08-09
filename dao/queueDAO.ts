import { Collection, ObjectId } from 'mongodb';
import logger from '../util/logger';
import { connectToDatabase } from '../util/db';
import Queue from '../models/queue';

let queue: Collection<Queue>;

export default class queueDAO {
  static async injectDB(conn) {
    if (queue) {
      return;
    }
    try {
      queue = await conn.db(process.env.BEDROCK_NS).collection('queue');
    } catch (e) {
      logger.log('error',
        `Unable to establish a collection handle in queueDAO: ${e}`);
    }
  }

  static async insert(userId: Queue['userId'], course: Queue['course'], subject: Queue['subject'], reason: Queue['reason'], embedding: Queue['embedding']) {
    const { db } = await connectToDatabase();
    queue = db.collection('queue');
    const NewQueue = new Queue(new ObjectId(userId), course, subject, reason, embedding);
    try {
    // Destructure data to ensure no unwanted fields;
      const result = await queue.insertOne(NewQueue);
      return ({ error: null, result: result.insertedId });
    } catch (e) {
      return ({ error: e.toString(), result: null });
    }
  }

  /**
   *
   * @param {*} db The database connection
   * @param {*} userId  The document of the queue (not the userId)
   */
  static async remove(userId: string) {
    const { db } = await connectToDatabase();
    queue = db.collection('queue');
    try {
      const result = await queue.deleteOne({ userId: new ObjectId(userId) });
      return ({ error: null, result });
    } catch (e) {
      return ({ error: e.toString(), result: null });
    }
  }

  static async all()
  :Promise<{error:string, result: null} | {error: null, result: Queue[]}> {
    const { db } = await connectToDatabase();
    queue = db.collection('queue');
    try {
      const docs = await queue.find();
      const result = await docs.toArray();
      await docs.close();
      return ({ error: null, result });
    } catch (e) {
      return ({ error: e.toString(), result: null });
    }
  }

  static async findByUserId(userId)
  :Promise<{error:string, result: null} | {error: null, result: Queue}> {
    const { db } = await connectToDatabase();
    queue = db.collection('queue');
    try {
      const result = await queue.findOne({ userId: new ObjectId(userId) });
      return ({ error: null, result });
    } catch (e) {
      return ({ error: e.toString(), result: null });
    }
  }

  static async kNearestNeighbor(embedding: number[], k:number):Promise<{result?: {_id: Queue['_id'], userId: Queue['userId']}[], error?: string}> {
    const { db } = await connectToDatabase();
    queue = db.collection('queue');
    try {
      const result = await queue.aggregate<{_id: Queue['_id'], userId: Queue['userId']}>([{
        $search: {
          index: 'default',
          knnBeta: {
            vector: embedding,
            path: 'embedding',
            k,
          },
        },
      }]).project<{_id: Queue['_id'], userId: Queue['userId']}>({ userId: true }).toArray();

      return { error: null, result };
    } catch (e) {
      console.log(e.toString());
      return { result: null, error: e.toString() };
    }
  }
}

/**
 * @typedef DAOResponse
 * @property {string | null} error
 * @property {Object} result - result of query
 */
