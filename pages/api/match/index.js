/*
  When a request comes to the server it is
 */

import nc from 'next-connect';
import queueDAO from '../../../dao/queueDAO';
// import roomsDAO from '../../../dao/roomsDAO';
import { all } from '../../../middleware';
import matchMaker from '../../../workers/matchmaker';
import RoomEmitter from '../../../emitters/rooms';

const handler = nc();
handler.use(all);

handler.post(async (req, res) => {
  const {
    user: { _id: userId }, body: {
      courseLevel, course, sessionLength, tags,
    },
  } = req;
  // Possibly Redundant
  const { result: doc } = await queueDAO.findByUserId(userId);
  if (!doc) {
    await queueDAO.insert({
      userId, courseLevel, course, sessionLength, tags,
    });
  }
  matchMaker();
  RoomEmitter.on('create', (room) => {
    let result = false;
    room.users.forEach((roomUser) => {
      if (roomUser.equals(userId)) result = true;
    });
    if (result) {
      res.json(room);
      // eslint-disable-next-line no-useless-return
      return;
    }
  });
});
export default handler;
