import nc from 'next-connect';
import { NextApiResponse, NextApiRequest } from 'next';
import passport from '@/middleware/passport';
import { all } from '@/middleware/index';
import { extractUser } from '@/lib/api-helpers';

const handler = nc();

handler.use(all);
handler.post(passport.authenticate('local', { failureRedirect: '/login' }), (req: NextApiRequest, res: NextApiResponse) => res.json({ error: null, result: extractUser(req.user) }));

export default handler;
