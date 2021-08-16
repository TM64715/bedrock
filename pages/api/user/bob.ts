import { NextApiResponse, NextApiRequest } from 'next';

import nc from 'next-connect';
import { all } from '../../../middleware';

const handler = nc();
handler.use(all);
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  res.json(req.user);
});
export default handler;
