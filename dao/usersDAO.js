import { ObjectID } from 'mongodb';

import { genHash } from '../service/encrypt.service';
import { connectToDatabase } from '../util/db';

let users;

export default class UsersDAO {
  static async injectDB(conn) {
    if (users) {
      return;
    }
    try {
      users = await conn.db(process.env.BEDROCK_NS).collection('users');
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in usersDAO: ${e}`,
      );
    }
  }

  /**
     *
     * @param {Object} userInfo
     * @param {Function} callback
     *
     */

  // Should never be called

  static async findOrCreate(userInfo) {
    const { db } = await connectToDatabase();
    users = db.collection('users');
    const {
      zoomId, name, accessToken, refreshToken, admin,
    } = userInfo;
    await users.updateOne({ zoomId }, {
      $set: {
        zoomId, name, accessToken, refreshToken, admin,
      },
    }, { upsert: true });
    try {
      const result = await users.findOne({ zoomId });
      return ({ error: null, result });
    } catch (e) {
      const error = `An error occured while finding document: ${e.toString()}`;
      console.error(error);
      return ({ error, result: null });
    }
  }
  /**
     *
     * @param {Object} userInfo
     * @returns {DAOResponse}
     */

  static async createUser(userInfo) {
    const { db } = await connectToDatabase();
    users = db.collection('users');
    const { email, name, password } = userInfo;
    try {
      const { hash } = await genHash(password);
      const result = await users.insertOne({ name, email, hash });
      return ({ error: null, result });
    } catch (e) {
      return ({ error: e.toString(), result: null });
    }
  }

  /**
     * @param {String} id - id of a user
     * @returns {DAOResponse} Returns an error or a document
    */
  static async findById(id) {
    const { db } = await connectToDatabase();
    users = db.collection('users');
    try {
      const doc = await users.findOne({ _id: ObjectID(id) });
      return ({ error: null, result: doc });
    } catch (e) {
      return ({ error: e, result: null });
    }
  }
  /**
     * @param {String} email - email of a user
     * @returns {DAOResponse}
    */

  static async findByEmail(email) {
    const { db } = await connectToDatabase();
    users = db.collection('users');
    try {
      const doc = await users.findOne({ email });
      return ({ error: null, result: doc });
    } catch (e) {
      return ({ error: e.toString(), result: null });
    }
  }
  /**
     * @param {Object} UserInfo
     * @returns {DAOResponse}
     */

  static async deleteUser(UserInfo) {
    const { db } = await connectToDatabase();
    users = db.collection('users');
    try {
      const { _id: id } = UserInfo;
      const doc = await users.deleteOne({ _id: id });
      return ({ error: null, result: doc });
    } catch (e) {
      return ({ error: e, result: null });
    }
  }
}

/**
 * @typedef DAOResponse
 * @property {string | null} error
 * @property {Object} result - result of query
 */
