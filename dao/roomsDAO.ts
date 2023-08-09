import { Collection, InsertOneResult, ObjectId } from 'mongodb';
import { connectToDatabase } from '../util/db';
import logger from '../util/logger';
import Room from '../models/room';

let rooms: Collection<Room>;

class roomsDAO {
  static async injectDB(conn) {
    if (rooms) {
      return;
    }
    try {
      rooms = await conn.db(process.env.BEDROCK_NS).collection('rooms');
    } catch (e) {
      logger.log('error',
        `Unable to establish a collection handle in roomsDAO: ${e}`);
    }
  }

  static async create(
    users: ObjectId[], meetingId: string, url: string, name: string, archived: 0 | 1 | 2,
  ):Promise<{error:string, result:null} | {error:null, result:InsertOneResult<Room>}> {
    const { db } = await connectToDatabase();
    rooms = db.collection('rooms');
    const NewRoom = new Room(users, meetingId, url, name, archived);
    if (!Array.isArray(users)) return { error: 'users must be an array', result: null };
    try {
      const result = await rooms.insertOne(NewRoom);
      return ({ error: null, result });
    } catch (e) {
      return ({ error: e.toString(), result: null });
    }
  }

  // static async watchUser(userId, callback) {
  //   const { db } = await connectToDatabase();
  //   const pipeline = [
  //     {
  //       $match: {
  //         users: {
  //           $in: [
  //             new ObjectId(userId),
  //           ],
  //         },
  //       },
  //     },
  //   ];
  //   rooms = db.collection('rooms');
  //   const stream = rooms.watch(pipeline);
  //   stream.on('change', (result) => {
  //     logger.log('debug', 'event reached');
  //     callback({ result: result.fullDocument });
  //     process.nextTick(() => stream.close());
  //   });
  // }

  static async findById(id) {
    const { db } = await connectToDatabase();
    rooms = db.collection('rooms');
    try {
      const result = await rooms.findOne({ _id: new ObjectId(id) });
      return ({ error: null, result });
    } catch (e) {
      return ({ error: e.toString(), result: null });
    }
  }

  /* Archive 0 means that both people are present 1 means that only one person is
  present and 2 means that no one is present */
  static async setArchive(roomId: string, archived: 0 | 1 | 2, userId: string) {
    const { db } = await connectToDatabase();
    rooms = db.collection('rooms');
    // console.log(archived);
    if (!(archived === 0 || archived === 1 || archived === 2)) return { error: 'invalid archived value', data: null };
    try {
      const result = await rooms.updateOne(
        {
          _id: new ObjectId(roomId),
          users: {
            $in: [new ObjectId(userId)],
          },
        },
        {
          $set: { archived },
        },
      );
      return ({ error: null, result });
    } catch (e) {
      return ({ error: e.toString(), result: null });
    }
  }

  static async findByUser(userId, search) {
    const { db } = await connectToDatabase();
    rooms = db.collection('rooms');
    try {
      const result = await rooms.find({ users: { $in: [new ObjectId(userId)] }, ...search });
      const resultArr = await result.toArray();
      const count = await result.count();
      await result.close();
      return ({ error: null, result: resultArr, count });
    } catch (e) {
      return ({ error: e.toString(), result: null });
    }
  }
  /*

  */
}

export default roomsDAO;
