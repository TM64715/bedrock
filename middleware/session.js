import session from 'express-session';
import MongoStore from 'connect-mongo';
import { connectToDatabase } from '../util/db';

export default async function sessionMiddleware(req, res, next) {
  const { client } = await connectToDatabase();
  return session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: true,
    store: MongoStore.create({
      client,
      mongoUrl: process.env.APP_DB_URI,
      collectionName: 'sessions',
      stringify: false,
    }),
  })(req, res, next);
}
