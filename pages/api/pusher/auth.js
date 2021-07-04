import nc from 'next-connect';
import pusher from '../../../lib/pusher';
import { all } from '../../../middleware';
import logger from '../../../util/logger';

const handler = nc();
handler.use(all);
handler.post((req, res) => {
  try {
    // eslint-disable-next-line camelcase
    const { socket_id, channel_name } = req.body;
    const auth = pusher.authenticate(socket_id, channel_name);
    res.send(auth);
  } catch (e) {
    logger.error(e.toString());
    res.status(403).send(e.toString());
  }
});
export default handler;
