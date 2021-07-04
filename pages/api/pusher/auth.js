import pusher from '../../../lib/pusher';

const handler = (req, res) => {
  const { socket_id: socketId, channel } = req.body;
  const auth = pusher.authenticate(channel, socketId);
  res.send(auth);
};
export default handler;
