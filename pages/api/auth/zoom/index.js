import nc from 'next-connect';
import { all } from '../../../../middleware';
import passport from '../../../../middleware/passport';

const handler = nc();
handler.use(all);

handler.get(passport.authenticate('zoom'));
export default handler;
