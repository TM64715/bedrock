import nc from 'next-connect';
import roomsDAO from '../../../dao/roomsDAO';
import { all } from '../../../middleware';

const handler = nc();
handler.use(all);
handler.put(async (req, res) => {
  const { id } = req.body;
  res.json(await roomsDAO.archive(id));
});

export default handler;
