/*
  When a request comes to the server it is
 */
import nc from 'next-connect';
import queueDAO from '../../../dao/queueDAO';
import roomsDAO from '../../../dao/roomsDAO';
import { all } from '../../../middleware';
import matchMaker from '../../../workers/matchmaker';
// import RoomEmitter from '../../../emitters/rooms';
import { generateMatchText, generateEmbedding } from '../../../service/embedding.service';

const handler = nc();
handler.use(all);

handler.post(async (req, res) => {
  const {
    user: { _id: userId }, body: {
      subject, course, level, reason,
    },
  } = req;
  // Make sure that the user is not already in a queue
  const { result: queueResult } = await queueDAO.findByUserId(userId);
  // If the user is already in a nonArchived room then return that room
  const { count } = await roomsDAO.findByUser(userId, { archived: { $lt: 2 } });
  // console.log(count);
  if (!queueResult && !(count > 0)) {
    const matchEmbedding = await generateEmbedding(
      generateMatchText(subject, course, level, reason),
    );
    await queueDAO.insert(userId, course, subject, reason, matchEmbedding);
  }
  matchMaker();
  res.send('OK');
});
export default handler;
