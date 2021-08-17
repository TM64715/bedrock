import { NextApiResponse, NextApiRequest } from 'next';
import nc from 'next-connect';
import UsersDAO from '../../../dao/usersDAO';
import {all} from '../../../middleware';
const handler = nc<NextApiRequest, NextApiResponse>();

handler.use(all);

handler.get((req, res) => {
  res.json({p: 'p'});
});

export default handler;
