/*
  When a request comes to the server it is
 */

import nc from 'next-connect';
import queueDAO from '../../../dao/queueDAO';
import roomsDAO from '../../../dao/roomsDAO';
import { all } from '../../../middleware';
import matchMaker from '../../../workers/matchmaker';

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

  roomsDAO.watchUser(userId, ({ result }) => res.json({ result }));
});
export default handler;
