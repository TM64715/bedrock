import nc from 'next-connect';
import passport from './passport';
import sessionMiddleware from './session';

const all = nc();

all.use(sessionMiddleware).use(passport.initialize()).use(passport.session());

export default all;
