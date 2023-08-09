/* eslint-disable consistent-return */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import axios from 'axios';
import roomsDAO from '../dao/roomsDAO';
import queueDAO from '../dao/queueDAO';
import RoomEmitter from '../emitters/rooms';
import pusher from '../lib/pusher';
import logger from '../util/logger';

let active = false;
let iterations;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const propose = (user1, obj2) => {
  const { holds, prefs } = obj2;
  return !(prefs.indexOf(user1) > prefs.indexOf(holds));
};

async function worker() {
  if (iterations > 2) {
    logger.warn('infinite loop detected');
    process.exit(1);
  }
  const { error, result } = await queueDAO.all();
  // An error occured getting the documents so stop running the function and try again next time;
  if (error) {
    active = false;
    logger.log('error', error);
    return;
  } if (result.length === 0) {
    active = false;
    logger.debug('Found no documents');
    return;
  }
  // const countQueue = result.length;
  // const queuePrefs = {};
  // for (const obj of result) {
  //   const prefs = await queueDAO.kNearestNeighbor(obj.embedding, countQueue);
  //   queuePrefs[obj._id.toString()] = { prefs: prefs.result, proposedTo: [], holds: null };
  // }
  // const setProposedTo = [];
  // let nextChoice = queuePrefs[Object.keys(queuePrefs)[0]].prefs[0];
  // let proposer;
  // for (const [person, obj] of Object.entries(queuePrefs)) {
  //   proposer = person;
  //   nextChoice = obj.prefs[0];
  //   while (setProposedTo.includes(nextChoice)) {
  //     if (propose(proposer, queuePrefs[person]));
  //   }
  // }
  // console.log(JSON.stringify(queuePrefs));
  // return;
  let pairs = [];
  const qUser = result[0];
  // if it's even push new index
  const { result: neighbor } = await queueDAO.kNearestNeighbor(qUser.embedding, 2);
  if (neighbor.length > 1) {
    pairs.push([qUser, neighbor[1]]);
    await queueDAO.remove(neighbor[1].userId);
    await queueDAO.remove(qUser.userId);
  }

  pairs = pairs.filter((room) => room.length === 2);
  // eslint-disable-next-line no-console
  console.log(pairs);
  for (const room of pairs) {
    try {
      const { data: { url, id, name } } = await axios.post(`${process.env.VIDEO_API_URL}/rooms`, {
        properties: {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,

        },
      }, {
        headers: {
          Authorization: `Bearer ${process.env.DAILY_API_KEY}`,
        },
      });
      const { result: { insertedId: roomId } } = await roomsDAO.create(
        [room[0].userId, room[1].userId],
        id,
        url,
        name,
        0,
        false,
      );
      const { result: roomObj } = await roomsDAO.findById(roomId);
      RoomEmitter.emit('create', roomObj);
      const eventBatch = [];
      const channelName = 'private-match';
      const eventPrefix = 'match-';
      roomObj.users.forEach((user) => {
        eventBatch.push({ channel: channelName, name: `${eventPrefix}${user.toString()}`, data: roomObj });
      });
      try {
        pusher.triggerBatch(eventBatch);
      } catch (e) {
        logger.log('warn', e.stack);
        logger.log('error', e);
      }
      await queueDAO.remove(room[0].userId);

      await queueDAO.remove(room[1].userId);
    } catch (e) {
      logger.log('warn', e.toString());
      return;
    }

    return worker();
  }
}

async function makeMatch() {
  iterations = 0;
  if (active) return 'Already running';
  active = true;
  return worker();
}

export default makeMatch;
