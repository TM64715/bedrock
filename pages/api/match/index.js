/*
  When a request comes to the server it is
 */

import nc from 'next-connect';
import queueDAO from '../../../dao/queueDAO';
import roomsDAO from '../../../dao/roomsDAO';
import { all } from '../../../middleware';
import matchMaker from '../../../workers/matchmaker';
// import RoomEmitter from '../../../emitters/rooms';

const handler = nc();
handler.use(all);

handler.post(async (req, res) => {
  const {
    user: { _id: userId }, body: {
      subject, course, level, goals,
    },
  } = req;
  // Make sure that the user is not already in a queue
  const { result: queueResult } = await queueDAO.findByUserId(userId);
  // If the user is already in a nonArchived room then return that room
  const { count } = await roomsDAO.findByUser(userId, { archived: { $lt: 2 } });
  // console.log(count);
  if (!queueResult && !(count > 0)) {
    await queueDAO.insert(userId, subject, course, level, goals);
  }
  matchMaker();
  res.send('OK');
});
export default handler;
