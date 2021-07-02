let zoom;
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../util/db';

export default class ZoomDAO {
  static async findOrCreate(userInfo){
    const { db } = await connectToDatabase()
    zoom = db.collection('zoomAdmin');
    const {zoomId, name, accessToken, refreshToken, type } = userInfo
    await zoom.updateOne({zoomId}, {$set: {zoomId, name, accessToken, refreshToken, type}}, {upsert: true});
    try {
        let result = await zoom.findOne({zoomId})
        return({error: null, result});
    }
    catch (e) {
        let error = "An error occured while finding document: " + e.toString();
        console.error(error);
        return({error: error, result: null});
    }
  }
  static async updateTokens({accessToken, refreshToken, userId}) {
    const {db} = await connectToDatabase();
    zoom = db.collection('zoomAdmin');
    try {
      const result = await zoom.updateOne({id: ObjectId(userId)}, {accessToken, refreshToken});
      return {result, error: null}
    } catch(e) {
      return ({error: e.toString(), result: null})
    }
  }
  static async findById(id) {
    const {db} = await connectToDatabase();
    zoom = db.collection('zoomAdmin');
    try {
      const result = await zoom.findOne({_id: ObjectId(id)});
      return {result, error: null}
    } catch(e) {
      return ({error: e.toString(), result: null})
    }
  }

  static async getAccessToken() {
    const {db} = await connectToDatabase();
    zoom = db.collection('zoomAdmin');
    try {
      const result = await zoom.findOne({}, {accessToken: 1, refreshToken: 1});
      return {result, error: null}
    } catch(e) {
      return ({error: e.toString(), result: null})
    }
  }

}