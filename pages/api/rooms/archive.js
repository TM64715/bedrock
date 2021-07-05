/* eslint no-unused-expressions: ["error", { "allowTernary": true }] */
import nc from 'next-connect';
import roomsDAO from '../../../dao/roomsDAO';
import { all } from '../../../middleware';

const handler = nc();
handler.use(all);
handler.put(async (req, res) => {
  const { body: { roomId, archived }, user: { _id: userId } } = req;
  const { result: { archived: oldArchive } } = await roomsDAO.findById(roomId);
  let newNum;
  // eslint-disable-next-line default-case
  switch (oldArchive) {
    case 0:
      archived ? newNum = 1 : newNum = 0;
      break;
    case 1:
      archived ? newNum = 2 : newNum = 0;
      break;
    case 2:
      archived ? newNum = 2 : newNum = 1;
      break;
  }
  const { error } = await roomsDAO.setArchive({ roomId, userId, archived: newNum });
  res.json({ error, result: newNum });
});

export default handler;
