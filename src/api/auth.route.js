import { Router } from 'express';
import passport from 'passport';
import UserController from './UserController';

const router = new Router();

router.get('/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  const redirectUrl = `${process.env.CLIENT_APP_URL}?displayName=${req.user.displayName}`;
  res.redirect(redirectUrl);
});

router.post('/register', UserController.register);
router.post('/login', passport.authenticate('local', {
  failureRedirect: '/',
}), (req, res) => {
  const shallowObj = req.user;
  delete shallowObj.hash;
  delete shallowObj._id;
  res.json({ error: null, result: shallowObj });
});
router.get('/logout', (req, res) => {
  req.logout();
  res.send('Logged out');
});
router.get('/user', (req, res) => {
  res.json(req.user);
});
export default router;
