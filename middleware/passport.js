import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import UsersDAO from '../dao/usersDAO';
import { compareHash } from '../service/encrypt.service';

passport.use(new LocalStrategy(
  { usernameField: 'email', passwordField: 'password' },
  (async (email, password, done) => {
    const { error, result } = await UsersDAO.findByEmail(email);

    if (error) { return done(error); }

    if (!result) { return done(null, false); }

    const compareResult = await compareHash(password, result.hash);

    if (!(compareResult.result)) { return done(null, false); }

    return done(null, result);
  }),
));

passport.serializeUser((user, done) => {
  done(null, user._id.toHexString());
});

passport.deserializeUser(async (id, done) => {
  const { error, result } = await UsersDAO.findById(id);
  if (error) {
    done(error, false);
  } else {
    done(null, result);
  }
});

export default passport;
