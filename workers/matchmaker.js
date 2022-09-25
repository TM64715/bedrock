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
  let pairs = [];
  result.forEach((qUser, i) => {
    // if it's even push new index
    if (i % 2 === 0) pairs.push([qUser]);
    // else update an existing index
    else {
      pairs[(pairs.length - 1) / 2][1] = qUser;
    }
  });
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
      console.log(await queueDAO.remove(room[0].userId));

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
