import {
  ObjectId, Collection, Document, UpdateResult,
} from 'mongodb';
import { genHash } from '../service/encrypt.service';
import { connectToDatabase } from '../util/db';

let users: Collection;

interface DAOResponse {
  error: Error | null,
  result: Document | UpdateResult,
}
export default class UsersDAO {
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
  static async findById(id: string):Promise<DAOResponse> {
    const { db } = await connectToDatabase();
    users = db.collection('users');
    try {
      const doc = await users.findOne({ _id: new ObjectId(id) });
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

  static async updateUser(id: string, UserInfo: {
    name?: string;
    bio?: string;
    grade: number;
    image?: {
      url: string;
      publicId: string;
    };
  }):Promise<DAOResponse> {
    const { db } = await connectToDatabase();
    users = db.collection('users');
    try {
      const userInfoCopy = {
        name: UserInfo.name,
        bio: UserInfo.bio,
        grade: UserInfo.grade,
        image: UserInfo.image,
      };
      Object.keys(userInfoCopy).forEach((key) => userInfoCopy[key] === undefined
      && delete userInfoCopy[key]);
      const doc = await users.updateOne({ _id: new ObjectId(id) }, { $set: userInfoCopy });
      return ({ error: null, result: doc.upsertedCount });
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