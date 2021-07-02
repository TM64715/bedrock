import nc from 'next-connect';

const handler = nc();

handler.get((req, res) => {
  res.send(req.query);
});
export default handler;
