import { ObjectID } from 'mongodb';
import { connectToDatabase } from '../util/db';
import logger from '../util/logger';

let rooms;

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

  static async create(data) {
    const { db } = await connectToDatabase();
    rooms = db.collection('rooms');
    const {
      users, meetingId, url, name, archived,
    } = data;
    if (!Array.isArray(users)) return { error: 'users must be an array', data: null };
    try {
      const result = await rooms.insertOne({
        users, meetingId, url, name, archived,
      });
      return ({ error: null, result: result.ops[0] });
    } catch (e) {
      return ({ error: e.toString(), result: null });
    }
  }

  static async watchUser(userId, callback) {
    const { db } = await connectToDatabase();
    const pipeline = [
      {
        $match: {
          users: {
            $in: [
              new ObjectID(userId),
            ],
          },
        },
      },
    ];
    rooms = db.collection('rooms');
    const stream = rooms.watch();
    stream.on('change', (result) => {
      logger.log('event reached');
      callback({ result: result.fullDocument });
      process.nextTick(() => stream.close());
    }, pipeline);
  }

  static async findById(id) {
    const { db } = await connectToDatabase();
    rooms = db.collection('rooms');
    try {
      const result = await rooms.findOne({ _id: new ObjectID(id) });
      return ({ error: null, result });
    } catch (e) {
      return ({ error: e.toString(), result: null });
    }
  }

  static async setArchive({ roomId, archived, userId }) {
    const { db } = await connectToDatabase();
    rooms = db.collection('rooms');
    console.log(archived);
    if (!(archived === 0 || archived === 1 || archived === 2)) return { error: 'invalid archived value', data: null };
    try {
      const result = await rooms.updateOne(
        {
          _id: new ObjectID(roomId),
          users: {
            $in: [new ObjectID(userId)],
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
      const result = await rooms.find({ users: { $in: [new ObjectID(userId)] }, ...search });
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
