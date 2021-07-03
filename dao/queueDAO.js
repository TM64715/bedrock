let BEDROCK;
let queue;
import 'mongodb'
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../util/db';

export default class queueDAO {

  static async injectDB(conn) {
    if (queue) {
        return
    }
    try {
        queue = await conn.db(process.env.BEDROCK_NS).collection("queue")
    } catch (e) {
        console.error(
            `Unable to establish a collection handle in queueDAO: ${e}`,
        )
    }
  }

  static async insert(data) {
    const { db } = await connectToDatabase();
    queue = db.collection('queue');
    const {userId, courseLevel, course, sessionLength, tags} = data;
    try {
    //Destructure data to ensure no unwanted fields;
      const result = await queue.insertOne({userId: ObjectId(userId), courseLevel, course, sessionLength, tags})
      return ({error: null, result});
    } catch(e) {
      return({error: e.toString(), result: null})
    }
  }
  /**
   * 
   * @param {*} db The database connection
   * @param {*} userId  The document of the queue (not the userId)
   */
  static async remove(userId) {
    const { db } = await connectToDatabase();
    queue = db.collection('queue');
    try {
    const result = await queue.deleteOne({userId: ObjectId(userId)})
    return({error: null, result});
    } catch(e) {
      return({error: e.toString(), result: null})
    }
  }
  static async all () {
    const { db } = await connectToDatabase();
    queue = db.collection('queue');
    try {
      const docs = await queue.find();
      const result = await docs.toArray();
      await docs.close()
      return ({ error: null, result});
    } catch (e) {
      return ({error: e.toString(), result: null, })
    }
  }
  static async findByUserId(userId) {
    const { db } = await connectToDatabase();
    queue = db.collection('queue');
    try {
      const result = await queue.findOne({userId: ObjectId(userId)});
      return ({ error: null, result});
    } catch (e) {
      return ({error: e.toString(), result: null, })
    }
  }

}

/**
 * @typedef DAOResponse
 * @property {string | null} error
 * @property {Object} result - result of query
 */
