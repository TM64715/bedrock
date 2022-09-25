import { NextApiResponse, NextApiRequest } from 'next';
import { extractUser } from '@/lib/api-helpers';
import nc from 'next-connect';
import { all } from '../../../middleware';

const handler = nc();
handler.use(all);
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  res.json({ user: extractUser(req.user) });
});
export default handler;
